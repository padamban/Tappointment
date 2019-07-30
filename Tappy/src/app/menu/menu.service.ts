import { Injectable } from '@angular/core';
import { Button } from '../_shared/components/button/button.schema';
import { Utility } from '../_shared/util/utility';
import { DatabaseService } from '../_shared/data/database.service';
import { MenuItem } from '../_shared/_schemas/menu.schema';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  items: MenuItem[] = [];

  constructor(
    private db: DatabaseService
  ) {
    this.fetchItems();
  }


  fetchItems() {
    this.db.getLocalData().forEach( item => {
      this.db.placeData<MenuItem>(this.items, {db: item});
    });
  }


}
