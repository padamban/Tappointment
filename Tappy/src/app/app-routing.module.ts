import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PM } from './_shared/variables/routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: PM.R.MENU,
    pathMatch: 'full'
  },
  { path: PM.R.AUTH, loadChildren: './auth/auth.module#AuthPageModule' },
  { path: PM.R.MENU, loadChildren: './menu/menu.module#MenuPageModule' },
  { path: PM.R.CART, loadChildren: './cart/cart.module#CartPageModule' },
  { path: PM.R.ACCOUNT, loadChildren: './account/account.module#AccountPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
