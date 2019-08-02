import { Injectable } from '@angular/core';
import { CartContent, CartContentDb } from '../_shared/_schemas/menu.schema';
import { stringify } from '@angular/compiler/src/util';
import { BehaviorSubject } from 'rxjs';
import { MenuService } from '../menu/menu.service';
import { ToastService } from '../_shared/services/toast.service';
import { DatabaseService } from '../_shared/data/database.service';
import { AuthService } from '../auth/auth.service';
import { Utility } from '../_shared/util/utility';
import { Router } from '@angular/router';
import { PM } from '../_shared/variables/routes';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  counter: number = 0;
  bill: number = 0;

  billLimit: number = 20000;

  cartContent: CartContent;

  onCartContenChanges: BehaviorSubject<CartContent>;

  constructor(
    private menu: MenuService,
    private toast: ToastService,
    private db: DatabaseService,
    private auth: AuthService,
    private router: Router

  ) {
    this.cartContent = {
      db: {
        id: null,
        content: new Map<string, number>()
      }
    };

    this.onCartContenChanges = new BehaviorSubject<CartContent>(this.cartContent);
    this.auth.onUserAutehntication.subscribe(isAuth => {
      this.clearCart();
    });
  }

  addToCart(id: string) {
    if (this.isOverLimit(id)) {
      this.toast.presentToast({
        duration: 4000,
        message: `Legfeljebb ${this.billLimit} Ft értékben lehet rendelni.`,
        close: true,
        buttons: [
          {
            text: 'Beállítások',
            role: 'close',
            handler: () => {
              this.router.navigateByUrl(PM.nav(PM.R.ACCOUNT));
            }
          }
        ]
      }, 'cart_is_full');
    } else {
      const oldCount = this.cartContent.db.content.get(id);
      if (oldCount && oldCount > -1) {
        this.cartContent.db.content.set(id, oldCount + 1);
      } else {
        this.cartContent.db.content.set(id, 1);
      }
      this.updateCart();
    }

    return this.fakeBug();


  }

  removeFromCart(id: string) {
    const oldCount = this.cartContent.db.content.get(id);
    if (oldCount && oldCount > 1) {
      this.cartContent.db.content.set(id, oldCount - 1);
    } else {
      this.cartContent.db.content.delete(id);
    }
    this.updateCart();
  }

  clearCart() {
    this.cartContent.db.content.clear();
    this.updateCart();
  }


  updateCounter() {
    if (this.cartContent && this.cartContent.db && this.cartContent.db.content) {
      this.counter = 0;
      this.cartContent.db.content.forEach(v => this.counter += v);
    } else {
      this.counter = 0;
    }

  }

  async submitCart(name = '', email = '', phone = '') {

    const toastMsg = (msg: string) => {
      this.toast.presentToast({
        duration: 8000,
        message: msg,
        close: true,
        buttons: []
      }, 'update_firebase_menu');
    };

    return this.db.orderManager.addItem({
      content: Utility._mapToObj<number>(this.cartContent.db.content as Map<string, number>),
      email, phone, name,
      userId: this.auth.currentId,
      price: this.bill
    }).promise.then(
      ok => {
        toastMsg('Rendelés feladva.');
        this.clearCart();
      },
      nah => {
        toastMsg('Nem sikerült feladni.');
        console.log('orderManager.addItem nah', nah);

      },
    );

  }

  updateCartAmounts() {
    this.menu.items.forEach(item => item.cart = 0);
    if (this.cartContent.db.content) {
      this.cartContent.db.content.forEach((amount, id) => {
        const match = this.menu.items.find(item => item.db.id == id);
        if (match) {
          match.cart = amount;
        }
      });
    }
  }



  calculateBill() {
    let newBill = 0;
    this.cartContent.db.content.forEach((count, id) => {
      const match = this.menu.items.find(item => item.db.id == id);
      newBill += match.db.price * count;
    });
    this.bill = newBill;
  }

  isOverLimit(id: string) {
    let passedLimit = false;
    const match = this.menu.items.find(item => item.db.id == id);
    if (match) {
      if ((match.db.price + this.bill) > this.billLimit) {
        passedLimit = true;
      }
    }
    return passedLimit;
  }

  fakeBug() {
    if (this.bill == 1e4) {
      console.error('FAKE ERROR');
      return new Error('TAPPY - Fake bug.');
    }
  }


  updateCart() {
    this.updateCounter();
    this.updateCartAmounts();
    this.calculateBill();
    this.onCartContenChanges.next(this.cartContent);
  }



}
