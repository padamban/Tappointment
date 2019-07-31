import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'src/app/_shared/_schemas/menu.schema';
import { MENU_SPICY, MENU_VEGETARIAN } from 'src/app/_shared/variables/assets';
import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss'],
})
export class MenuCardComponent implements OnInit {

  @Input() item: MenuItem;


  spicyImg = MENU_SPICY;
  vegetarianImg = MENU_VEGETARIAN;



  constructor(
    public auth: AuthService,
    public cart: CartService,
  ) { }

  ngOnInit() {}

}
