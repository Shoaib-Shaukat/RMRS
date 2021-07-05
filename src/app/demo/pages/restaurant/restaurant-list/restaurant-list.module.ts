import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantListRoutingModule } from './restaurant-list-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RestaurantListRoutingModule,
    SharedModule
  ]
})
export class RestaurantListModule { }
