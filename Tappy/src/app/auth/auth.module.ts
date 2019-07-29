import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AuthPage } from './auth.page';
import { ToolbarModule } from '../_shared/components/toolbar/toolbar.module';

const routes: Routes = [
  {
    path: '',
    component: AuthPage
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
  declarations: [AuthPage]
})
export class AuthPageModule {}
