import { DbWrapper } from '../_schemas/all.schema';
import { Storage } from '@ionic/storage';




export class StorageManager<T extends DbWrapper> {

    constructor(
        private storage: Storage,
        private KEY: string
    ) {

    }

    addItem(item: T): Promise<any> {
        return this.storage.get(this.KEY).then((items: T[]) => {
            if (items) {
                items.push(item);
                return this.storage.set(this.KEY, items);
            } else {
                return this.storage.set(this.KEY, [item]);
            }
        });
    }

    getItems(): Promise<T[]> {
        return this.storage.get(this.KEY);
    }

    updateItem(item: T): Promise<any> {
        return this.storage.get(this.KEY).then((items: T[]) => {
            if (!items || items.length === 0) {
                return null;
            }

            const upToDateItems: T[] = [];

            items.forEach(i => {
                if (i.db.id === item.db.id) {
                    upToDateItems.push(item);
                } else {
                    upToDateItems.push(i);
                }
            });

            return this.storage.set(this.KEY, upToDateItems);
        });
    }


    deleteItem(item: T): Promise<T> {
        return this.storage.get(this.KEY).then((items: T[]) => {
            if (!items || items.length === 0) {
                return null;
            }

            const toKeepItems: T[] = [];

            items.forEach(i => {
                if (i.db.id !== item.db.id) {
                    toKeepItems.push(i);
                }
            });

            return this.storage.set(this.KEY, toKeepItems);
        });
    }

}
