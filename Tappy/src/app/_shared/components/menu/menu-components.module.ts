import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuListFilterComponent } from './menu-list-filter/menu-list-filter.component';
import { MenuCardComponent } from './menu-card/menu-card.component';
import { MenuListComponent } from './menu-list/menu-list.component';

const components = [
  MenuListFilterComponent,
  MenuListComponent,
  MenuCardComponent,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: components,
  exports: components,
  entryComponents: components,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MenuComponentsModule { }
