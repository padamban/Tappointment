import { Component, OnInit, Input } from '@angular/core';
import { MenuItemCategory } from 'src/app/_shared/_schemas/menu.schema';
import { MENU_SPICY, MENU_VEGETARIAN } from 'src/app/_shared/variables/assets';
import { MenuService } from 'src/app/menu/menu.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent implements OnInit {

  @Input() category: MenuItemCategory = null;
  @Input() onlyInCart: boolean = false;

  constructor(
    public menu: MenuService
  ) { }

  ngOnInit() {}

}
