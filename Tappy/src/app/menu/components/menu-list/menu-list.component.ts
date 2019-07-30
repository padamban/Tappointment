import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../../menu.service';
import { MenuItemCategory } from 'src/app/_shared/_schemas/menu.schema';
import { MENU_SPICY, MENU_VEGETARIAN } from 'src/app/_shared/variables/assets';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent implements OnInit {

  @Input() category: MenuItemCategory = null;

  constructor(
    public menu: MenuService
  ) { }

  

  ngOnInit() {}

}
