import { Injectable } from '@angular/core';
import { DATA } from './data';
import { MenuItemDb, MenuItem, OrderDb } from '../_schemas/menu.schema';
import { DatabaseManager } from './database.manager';
import { AngularFirestore } from '@angular/fire/firestore';
import { Utility } from '../util/utility';



@Injectable({
  providedIn: 'root'
})
export class DatabaseService {


  menuManager: DatabaseManager<MenuItemDb>;
  orderManager: DatabaseManager<OrderDb>;

  constructor(
    private afStore: AngularFirestore
  ) {
    this.menuManager = this.createMenuManager();
    this.orderManager = this.createOrderManager();

  }


  private createMenuManager() {
    return new DatabaseManager<MenuItemDb>(
      'MENU',
      this.afStore,
      null,
      raw => {
        return raw;
      },
      snap => {
        return !Utility._canUse(snap.data()) ? {} : {
          id: snap.data().id,
          name: snap.data().name,
          description: snap.data().description,
          category: snap.data().category,
          price: snap.data().price,
          isSpicy: snap.data().isSpicy,
          isVegetarian: snap.data().isVegetarian
        } as MenuItemDb;
      }
    );
  }
  private createOrderManager() {
    return new DatabaseManager<OrderDb>(
      'ORDER',
      this.afStore,
      null,
      raw => {
        return raw;
      },
      snap => {
        return !Utility._canUse(snap.data()) ? {} : {
          id: snap.data().id,
          userId: snap.data().userId,
          content: snap.data().content,
          email: snap.data().email,
          name: snap.data().name,
          phone: snap.data().phone,
          price: snap.data().price
        } as OrderDb;
      }
    );
  }

  /**
   * Gets the data saved in a js object within the project.
   */
  getLocalMenuData() {
    const data: MenuItemDb[] = [];
    DATA.forEach(item => {
      data.push({ ...item });
    });
    return data;
  }

  /**
   * Places the item into items, if the item is already present it is updated.
   * @param items - Each item has to have .db.id field.
   * @param item - Has to have .db.id field.
   * @param toRemove [default: false] - Will remove the item if finds it.
   * @return Index of the item in items.
   */
  placeData<T>(items: T[], item: T, toRemove = false) {
    let idx = -1;
    if (!!items && !!item) {
      const matchIdx = items.findIndex(i => {
        return i['db']['id'] == item['db']['id'];
      });

      if (toRemove) {
        if (matchIdx > -1) {
          items.splice(matchIdx, 1);
        }
      } else {
        if (matchIdx > -1) {
          items[matchIdx]['db'] = item['db'];
          idx = matchIdx;
        } else {
          items.push(item);
          idx = items.length - 1;
        }
      }
      return idx;
    }
  }

}
