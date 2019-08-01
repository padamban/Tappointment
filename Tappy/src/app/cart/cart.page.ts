import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { AuthService } from '../auth/auth.service';
import { MenuService } from '../menu/menu.service';
import { ToolbarContent } from '../_shared/components/toolbar/toolbar.schema';
import { Router } from '@angular/router';
import { PM } from '../_shared/variables/routes';
import { AlertController, ModalController } from '@ionic/angular';
import { OrderService } from '../order/order.service';
import { CartSubmitComponent } from './cart-submit/cart-submit.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {



  public toolbar: ToolbarContent = {
    centered: true,
    title: {
      show: true,
      content: ['Kosár']
    },
    logo: {
      content: [],
      show: false
    },
    buttons: [
      {
        slot: 'start',
        isMenu: true,
        color: 'dark',
        animate: false,
      },
    ]
  };

  constructor(
    public cart: CartService,
    public auth: AuthService,
    public menu: MenuService,
    private router: Router,
    private alert: AlertController,
    private order: OrderService,
    public modalController: ModalController

  ) { }

  ngOnInit() {
  }

  goToMenu() {
    this.router.navigateByUrl(PM.nav(PM.R.MENU));
  }

  onOrder() {
    console.log('order');
    this.presentOrderForm();
  }


  async presentOrderForm() {
    const modal = await this.modalController.create({
      component: CartSubmitComponent,
      componentProps: {
        modal: this.modalController,
        email: this.auth.currentEmail
      },
    });

    await modal.present();

  }


  async clear() {
    console.log('clear');
    const alert = await this.alert.create({
      header: 'Kosár ürítése ',
      message: 'Biztos ki akarod üríteni a kosarad?',
      buttons: [
        {
          text: 'Mégse',
          role: 'cancel',
          cssClass: 'tappy-alert-button',
          handler: (blah) => { }
        }, {
          text: 'Ürítés',
          cssClass: 'tappy-alert-button-highlight',
          handler: () => {
            this.cart.clearCart();
          }
        }
      ]
    });

    await alert.present();

  }

}
