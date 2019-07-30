import { Routes, RouterModule } from '@angular/router';
import { MenuPage } from './menu.page';
import { NgModule } from '@angular/core';


const routes: Routes = [
    {
        path: '',
        component: MenuPage,
        children: [
            {
                path: 'foods',
                children: [
                    {
                        path: '',
                        loadChildren: './foods/foods.module#FoodsPageModule'
                    },
                ]
            },
            {
                path: 'drinks',
                children: [
                    {
                        path: '',
                        loadChildren: './drinks/drinks.module#DrinksPageModule'
                    },
                ]
            },
            {
                path: '',
                redirectTo: '/menu/foods',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/menu/foods',
        pathMatch: 'full'
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MenuRoutingModule { }
