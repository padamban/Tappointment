import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderPage } from './order.page';
import { ToolbarModule } from '../_shared/components/toolbar/toolbar.module';
import { FrameModule } from '../_shared/components/frame/frame.module';

const routes: Routes = [
  {
    path: '',
    component: OrderPage
  }
];

const imported = [
  ToolbarModule,
  FrameModule,

];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ...imported
  ],
  declarations: [OrderPage]
})
export class OrderPageModule {}
