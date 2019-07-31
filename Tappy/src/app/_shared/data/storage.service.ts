import { Injectable } from '@angular/core';
import { Db, DbWrapper } from '../_schemas/all.schema';
import { MenuItem } from '../_schemas/menu.schema';
import { StorageManager } from './storage.manager';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  menuStorage: StorageManager<MenuItem>;

  constructor(
    private storage: Storage
  ) {

    this.menuStorage = new StorageManager<MenuItem>(this.storage, 'MENU');
  }


}
