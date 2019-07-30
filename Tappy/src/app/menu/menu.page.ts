import { Component, OnInit } from '@angular/core';
import { Button } from '../_shared/components/button/button.schema';
import { MENU_FOOD, MENU_DRINK } from '../_shared/variables/assets';
import { PM } from '../_shared/variables/routes';
import { UrlSegmentGroup, PRIMARY_OUTLET, UrlSegment, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';


export interface TabsContent {
  slot: string;
  tabs: Button[];
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {


  tabbar: TabsContent = {
    slot: 'top',
    tabs: [
      {
        active: true,
        iconType: 'src',
        name: 'Ételek',
        icon: MENU_FOOD,
        size: 'large',
        route: [PM.R.FOOD]
      },
      {
        active: false,
        iconType: 'src',
        name: 'Italok',
        icon: MENU_DRINK,
        size: 'large',
        route: [PM.R.DRINK]
      }
    ]
  };

  public currentTab: string;


  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.pipe(debounceTime(50)).subscribe((val) => {
      this.activateTabButtons();
    });
  }


  activateTabButtons() {
    const tree = this.router.parseUrl(this.router.url);
    const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    const s: UrlSegment[] = g.segments;

    if (!!s[1]) {
      const path = s[1].path;
      this.currentTab = path;
    } else {
      this.currentTab = 'NA';
    }
  }


}
