import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { MenuItemCategory } from 'src/app/_shared/_schemas/menu.schema';
import { IonSlides } from '@ionic/angular';
import { ToolbarContent } from 'src/app/_shared/components/toolbar/toolbar.schema';
import { MenuFilter } from 'src/app/_shared/components/menu/menu-list-filter/menu-list-filter.component';




@Component({
  selector: 'app-foods',
  templateUrl: './foods.page.html',
  styleUrls: ['./foods.page.scss'],
})
export class FoodsPage {

  public filter: MenuFilter = {
    default: 0,
    buttons: [
      {
        value: MenuItemCategory.Starter,
        color: 'medium',
        fill: 'clear',
        size: 'large',
        name: 'Előételek',
        action: () => {
          this.selectFilter(MenuItemCategory.Starter);
        }
      },
      {
        value: MenuItemCategory.Soup,
        color: 'medium',
        fill: 'clear',
        size: 'large',
        name: 'Levesek',
        action: () => {
          this.selectFilter(MenuItemCategory.Soup);
        }
      },
      {
        value: MenuItemCategory.MainDish,
        color: 'medium',
        fill: 'clear',
        size: 'large',
        name: 'Főételek',
        action: () => {
          this.selectFilter(MenuItemCategory.MainDish);
        }
      },
      {
        value: MenuItemCategory.Pizza,
        color: 'medium',
        fill: 'clear',
        size: 'large',
        name: 'Pizzák',
        action: () => {
          this.selectFilter(MenuItemCategory.Pizza);
        }
      },
      {
        value: MenuItemCategory.Dessert,
        color: 'medium',
        fill: 'clear',
        size: 'large',
        name: 'Desszertek',
        action: () => {
          this.selectFilter(MenuItemCategory.Dessert);
        }
      }
    ]
  };



  slideOptions = {
    initialSlide: 0,
    speed: 400,
    autoHeight: true,

  };

  slideIdx: number;


  currentCategory: MenuItemCategory = MenuItemCategory.Starter;

  constructor(
    public menu: MenuService
  ) { }


  selectFilter(category?: MenuItemCategory) {
    this.currentCategory = category;
  }

}
