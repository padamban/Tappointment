import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MenuFilter } from '../components/menu-list-filter/menu-list-filter.component';
import { MenuService } from '../menu.service';
import { MenuItemCategory, MenuSlideContent } from 'src/app/_shared/_schemas/menu.schema';
import { IonSlides } from '@ionic/angular';




@Component({
  selector: 'app-foods',
  templateUrl: './foods.page.html',
  styleUrls: ['./foods.page.scss'],
})
export class FoodsPage implements OnInit, AfterViewInit {

  // @ViewChild('slides', { static: true }) slides: IonSlides;


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
  ) {

    
  }

  ngOnInit() {
  }


  selectFilter(category?: MenuItemCategory) {
    console.log("Filter", category);
    this.currentCategory = category;
    // this.goSlide(category);
  }

  ngAfterViewInit() {
    // this.slides.ionSlideTransitionEnd.subscribe(e => {
    //   this.slides.getActiveIndex().then(id => {
    //     this.slideIdx = id;
    //   });
    // });
  }


  ionViewWillEnter() {
    // this.slides.lockSwipes(true);
    // this.cards.forEach((card, i) => {
    //   this.submitProgress(i, false, 'primary', true);
    // });
  }

  goSlide(idx: number) {
    // this.slides.lockSwipes(false);
    // this.slides.slideTo(idx).then(() => this.slideIdx = idx);
    // this.slides.lockSwipes(true);
  }

}
