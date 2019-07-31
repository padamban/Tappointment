import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { AuthService } from '../auth/auth.service';
import { MenuService } from '../menu/menu.service';
import { ToolbarContent } from '../_shared/components/toolbar/toolbar.schema';
import { Router } from '@angular/router';
import { PM } from '../_shared/variables/routes';

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
    public menu: MenuService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToMenu() {
    this.router.navigateByUrl(PM.nav(PM.R.MENU));
  }

  order() {
    console.log('order');
  }

}
