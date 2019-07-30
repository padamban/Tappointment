import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FoodsPage } from './foods.page';
import { MenuComponentsModule } from '../components/menu-components.module';
import { FrameModule } from 'src/app/_shared/components/frame/frame.module';

const routes: Routes = [
  {
    path: '',
    component: FoodsPage
  }
];

const imported = [
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
  declarations: [FoodsPage]
})
export class FoodsPageModule {}
