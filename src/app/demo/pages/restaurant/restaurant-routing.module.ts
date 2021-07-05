import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'restaurant-list',
      loadChildren: () => import('./restaurant-list/restaurant-list.module').then(module => module.RestaurantListModule)
    },
    {
      path: 'restaurant-add',
      loadChildren: () => import('./restaurant-add/restaurant-add.module').then(module => module.RestaurantAddModule)
    },
    {
      path: 'restaurant-edit',
      loadChildren: () => import('./restaurant-add/restaurant-add.module').then(module => module.RestaurantAddModule)
    },
    {
      path: 'restaurant-profile',
      loadChildren: () => import('./restaurant-profile/restaurant-profile.module').then(module => module.RestaurantProfileModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }
