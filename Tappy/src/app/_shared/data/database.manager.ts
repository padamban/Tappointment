import { AngularFirestore, DocumentSnapshot, DocumentChangeType } from '@angular/fire/firestore';
import { Utility } from '../util/utility';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Db, DbWrapper } from '../_schemas/all.schema';

export class DatabaseManager<T extends Db> {

    constructor(
        private DB: any,
        private afStore: AngularFirestore,
        private afStorage: AngularFireStorage,
        private rawMapper: (raw: any) => T,
        private snapshotMapper: (snap: DocumentSnapshot<T>) => T
    ) { }


    uploadItem(id: string, data: T) {
        data.id = id;
        return this.afStore.collection(this.DB).doc(id).set(this.fill(data));
    }

    updateItem(id: string, data: T) {
        data.id = id;
        return this.afStore.collection(this.DB).doc(id).set(this.fill(data), { merge: true });
    }

    deleteItem(id: any) {
        return this.afStore.collection(this.DB).doc(id).delete();
    }

    getItem(id: string) {
        return this.afStore.collection(this.DB).doc(id).get().toPromise();
    }

    addItem(data: T) {
        const id = this.afStore.createId();
        data.id = id;
        return { id, promise: this.afStore.collection(this.DB).doc(id).set(data) };
    }

    getItems(id: string) {
        return this.afStore.collection(this.DB).get().toPromise();
    }

    watchItem(id: string) {
        return this.afStore.collection(this.DB).doc(id).snapshotChanges();
    }

    watchItems() {
        return this.afStore.collection(this.DB).stateChanges();
    }

    mapSnapshotItem(snap: DocumentSnapshot<T>): T {
        if (Utility._canUse(this.snapshotMapper)) {
            return this.snapshotMapper(snap);
        }
        return null;
    }

    mapRawItem(raw: any): T {
        if (Utility._canUse(this.rawMapper)) {
            return this.rawMapper(raw);
        }
        return null;
    }


    placeItem<U extends DbWrapper>(type: DocumentChangeType, items: U[], item: U) {

        if (!!items && !!item) {
            const matchIdx = items.findIndex(i => {
                return i.db.id == item.db.id;
            });
            if (type == 'added' && matchIdx == -1) {
                items.push(item);
            } else if (type == 'modified') {
                items[matchIdx].db = item.db;
            } else if (type == 'removed' && matchIdx != -1) {
                items.splice(matchIdx, 1);
            }
        }

    }


    private fill(o: T) {
        Object.keys(o).forEach(k => {
            if (!Utility._canUse(o[k])) {
                o[k] = null;
            }
        });
        return o;
    }


}

