import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantAddComponent } from './restaurant-add.component';


const routes: Routes = [
  {
    path: '',
    component: RestaurantAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantAddRoutingModule { }
