import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';
import { ToolbarModule } from '../_shared/components/toolbar/toolbar.module';

const routes: Routes = [
  {
    path: '',
    component: MenuPage
  }
];

const imported = [
  ToolbarModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ...imported
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
