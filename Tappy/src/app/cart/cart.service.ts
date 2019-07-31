import { Injectable } from '@angular/core';
import { CartContent, CartContentDb } from '../_shared/_schemas/menu.schema';
import { stringify } from '@angular/compiler/src/util';
import { BehaviorSubject } from 'rxjs';
import { MenuService } from '../menu/menu.service';
import { ToastService } from '../_shared/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  counter: number = 0;
  bill: number = 0;


  cartContent: CartContent;

  onCartContenChanges: BehaviorSubject<CartContent>;

  constructor(
    private menu: MenuService,
    private toast: ToastService
  ) {
    this.cartContent = {
      db: {
        id: null,
        content: new Map<string, number>()
      }
    };

    this.onCartContenChanges = new BehaviorSubject<CartContent>(this.cartContent);

  }

  addToCart(id: string) {
    if (this.isOverLimit(id)) {
      this.toast.presentToast({
        duration: 4000,
        message: `Legfeljebb 20000 Ft értékben lehet rendelni.`,
        close: true,
        buttons: []
      }, 'cart_is_full');
    } else {
      const oldCount = this.cartContent.db.content.get(id);
      if (oldCount && oldCount > -1) {
        this.cartContent.db.content.set(id, oldCount + 1);
      } else {
        this.cartContent.db.content.set(id, 1);
      }
      this.updateCart();
      this.onCartContenChanges.next(this.cartContent);
    }

  }

  removeFromCart(id: string) {
    const oldCount = this.cartContent.db.content.get(id);
    if (oldCount && oldCount > 1) {
      this.cartContent.db.content.set(id, oldCount - 1);
    } else {
      this.cartContent.db.content.delete(id);
    }
    this.updateCart();
    this.onCartContenChanges.next(this.cartContent);
  }


  updateCounter() {
    if (this.cartContent && this.cartContent.db && this.cartContent.db.content) {
      this.counter = 0;
      this.cartContent.db.content.forEach(v => this.counter += v);
    } else {
      this.counter = 0;
    }

  }

  submitCart() {

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
      if ( (match.db.price + this.bill) > 20000 ) {
        passedLimit = true;
      }
    }
    return passedLimit;
  }


  updateCart() {
    this.updateCounter();
    this.updateCartAmounts();
    this.calculateBill();
  }



}
