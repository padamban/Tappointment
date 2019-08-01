import { Component, OnInit } from '@angular/core';
import { Button } from '../_shared/components/button/button.schema';
import { MENU_FOOD, MENU_DRINK } from '../_shared/variables/assets';
import { PM } from '../_shared/variables/routes';
import { UrlSegmentGroup, PRIMARY_OUTLET, UrlSegment, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { ToolbarContent } from '../_shared/components/toolbar/toolbar.schema';


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


  public toolbar: ToolbarContent = {
    centered: true,
    title: {
      show: true,
      content: ['Étlap']
    },
    logo: { },
    buttons: [
      {
        slot: 'start',
        isMenu: true,
        color: 'dark',
        animate: false,
      },
    ]
  };


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

  hasCart: boolean = true;

  public currentTab: string;


  constructor(
    private router: Router,
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
