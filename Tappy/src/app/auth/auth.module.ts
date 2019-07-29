import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AuthPage } from './auth.page';
import { ToolbarModule } from '../_shared/components/toolbar/toolbar.module';
import { GeneralFormModule } from '../_shared/components/general-form/general-form.module';
import { FrameModule } from '../_shared/components/frame/frame.module';
import { ButtonModule } from '../_shared/components/button/button.module';

const routes: Routes = [
  {
    path: '',
    component: AuthPage
  }
];

const imported = [
  ToolbarModule,
  GeneralFormModule,
  FrameModule,
  ButtonModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ...imported
  ],
  declarations: [AuthPage]
})
export class AuthPageModule {}
