import { Injectable } from '@angular/core';
import { Button } from '../_shared/components/button/button.schema';
import { Utility } from '../_shared/util/utility';
import { DatabaseService } from '../_shared/data/database.service';
import { MenuItem, CartContent, CartContentDb, MenuItemDb } from '../_shared/_schemas/menu.schema';
import { CartService } from '../cart/cart.service';
import { DocumentSnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  items: MenuItem[] = [];

  constructor(
    private db: DatabaseService,
  ) {
    // this.fetchItems();

    this.db.menuManager.watchItems().subscribe(items => {
      items.forEach(item => {
        const menuItem: MenuItem = {
          db: this.db.menuManager.mapSnapshotItem(item.payload.doc as DocumentSnapshot<MenuItemDb>)
        };
        this.db.menuManager.placeItem(item.type, this.items, menuItem);
      });
    });

  }


  fetchItems() {
    this.db.getLocalMenuData().forEach(item => {
      this.db.placeData<MenuItem>(this.items, { cart: 0, db: item });
    });
  }




}
