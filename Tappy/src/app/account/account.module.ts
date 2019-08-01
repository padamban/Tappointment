import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AccountPage } from './account.page';
import { ToolbarModule } from '../_shared/components/toolbar/toolbar.module';
import { FrameModule } from '../_shared/components/frame/frame.module';

const routes: Routes = [
  {
    path: '',
    component: AccountPage
  }
];

const imported = [
  ToolbarModule,
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
  declarations: [AccountPage]
})
export class AccountPageModule {}
