import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from '../_shared/data/database.service';
import { OrderItem, OrderDb, MenuItem } from '../_shared/_schemas/menu.schema';
import { DocumentSnapshot } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { MenuService } from '../menu/menu.service';
import { ToastService } from '../_shared/services/toast.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders: OrderItem[] = [];

  private sub$: Subscription[] = [];

  constructor(
    public modalController: ModalController,
    private db: DatabaseService,
    private menu: MenuService,
    private toast: ToastService,
    private auth: AuthService
  ) {
    this.auth.onUserAutehntication.subscribe(isAuth => {
      if (isAuth) {
        this.subscribe();
      } else {
        this.unsubscribe();
      }
    });
  }


  subscribe() {
    this.unsubscribe();
    this.sub$.push(this.db.orderManager.watchItems().subscribe(items => {
      items.forEach(item => {
        const order: OrderItem = {
          db: this.db.orderManager.mapSnapshotItem(item.payload.doc as DocumentSnapshot<OrderDb>),
          content: new Map<string, MenuItem>()
        };
        this.db.orderManager.placeItem(item.type, this.orders, order);
      });
      this.updateOrderMetaData(this.menu.items);
    }));
    this.sub$.push(this.menu.onItemsChange.subscribe(items => {
      this.updateOrderMetaData(items);
    }));
  }


  unsubscribe() {
    this.sub$.forEach(s => s.unsubscribe());
    this.sub$.length = 0;
  }


  updateOrderMetaData(menu: MenuItem[]) {
    this.orders.forEach(ord => {
      Object.entries(ord.db.content).forEach(kv => {
        const menuItemId = kv[0] as string;
        const menuItemCount = kv[1] as number;
        const match = menu.find(item => item.db.id == menuItemId);
        ord.content.set(menuItemId, { db: { ...match.db }, cart: menuItemCount });
      });
      ord.canDelete = this.auth.currentId == ord.db.userId;
    });
  }

  deleteOrder(id: string) {

    const toastMsg = (msg: string) => {
      this.toast.presentToast({
        duration: 8000,
        message: msg,
        close: true,
        buttons: []
      }, 'delete_order');
    };

    this.db.orderManager.deleteItem(id).then(
      ok => {
        toastMsg('Rendelés törölve.');
      },
      nah => {
        toastMsg('Sikertelen törlés.');
      },
    );
  }

}
