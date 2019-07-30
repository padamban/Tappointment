import { Injectable } from '@angular/core';
import { DATA } from './data';
import { MenuItemDb } from '../_schemas/menu.schema';



@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  /**
   * Gets the data saved in a js object within the project.
   */
  getLocalData() {
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
          items[matchIdx]['db'] = item['db']
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
