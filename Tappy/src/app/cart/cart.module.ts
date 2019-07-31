import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CartPage } from './cart.page';
import { ToolbarModule } from '../_shared/components/toolbar/toolbar.module';
import { MenuComponentsModule } from '../_shared/components/menu/menu-components.module';
import { FrameModule } from '../_shared/components/frame/frame.module';

const routes: Routes = [
  {
    path: '',
    component: CartPage
  }
];

const imported = [
  ToolbarModule,
  MenuComponentsModule,
  FrameModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ...imported
  ],
  declarations: [CartPage]
})
export class CartPageModule {}
