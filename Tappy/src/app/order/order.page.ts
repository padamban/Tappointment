import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToolbarContent } from '../_shared/components/toolbar/toolbar.schema';
import { OrderService } from './order.service';
import { MenuService } from '../menu/menu.service';
import { DatabaseService } from '../_shared/data/database.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit, OnDestroy {

  public toolbar: ToolbarContent = {
    centered: true,
    title: {
      show: true,
      content: ['Rendelések']
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
    public order: OrderService,
    public menu: MenuService,

  ) { }

  ngOnInit() { }

  ngOnDestroy() { }


}
