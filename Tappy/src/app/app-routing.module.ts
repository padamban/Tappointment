import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PM } from './_shared/variables/routes';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: PM.R.MENU,
    pathMatch: 'full'
  },
  { path: PM.R.AUTH, loadChildren: './auth/auth.module#AuthPageModule', canLoad: [], canActivate: [] },
  { path: PM.R.MENU, loadChildren: './menu/menu.module#MenuPageModule', canLoad: [], canActivate: []  },
  { path: PM.R.CART, loadChildren: './cart/cart.module#CartPageModule', canLoad: [], canActivate: [AuthGuard]  },
  { path: PM.R.ACCOUNT, loadChildren: './account/account.module#AccountPageModule', canLoad: [], canActivate: [AuthGuard]  },
  { path: PM.R.ORDER, loadChildren: './order/order.module#OrderPageModule', canLoad: [], canActivate: [AuthGuard]  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
