import { Component, OnInit } from '@angular/core';
import { MenuItemCategory } from 'src/app/_shared/_schemas/menu.schema';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.page.html',
  styleUrls: ['./drinks.page.scss'],
})
export class DrinksPage implements OnInit {

  currentCategory: MenuItemCategory = MenuItemCategory.Drink;

  constructor() { }

  ngOnInit() {
  }

}
