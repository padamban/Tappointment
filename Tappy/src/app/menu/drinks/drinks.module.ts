import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DrinksPage } from './drinks.page';
import { FrameModule } from 'src/app/_shared/components/frame/frame.module';
import { MenuComponentsModule } from '../components/menu-components.module';

const routes: Routes = [
  {
    path: '',
    component: DrinksPage
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
  declarations: [DrinksPage]
})
export class DrinksPageModule {}
