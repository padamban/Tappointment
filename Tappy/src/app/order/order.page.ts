import { Component, OnInit } from '@angular/core';
import { ToolbarContent } from '../_shared/components/toolbar/toolbar.schema';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

}
