import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CartPage } from './cart.page';
import { ToolbarModule } from '../_shared/components/toolbar/toolbar.module';
import { FrameModule } from '../_shared/components/frame/frame.module';
import { CartSubmitComponent } from './cart-submit/cart-submit.component';
import { GeneralFormModule } from '../_shared/components/general-form/general-form.module';
import { MenuComponentsModule } from '../_shared/components/menu/menu-components.module';

const routes: Routes = [
  {
    path: '',
    component: CartPage
  }
];

const imported = [
  ToolbarModule,
  MenuComponentsModule,
  FrameModule,
  GeneralFormModule
];

const components = [
  CartSubmitComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ...imported
  ],
  declarations: [CartPage, ...components],
  exports: components,
  entryComponents: components,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CartPageModule {}
