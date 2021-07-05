import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantAddRoutingModule } from './restaurant-add-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RestaurantAddRoutingModule,
    SharedModule
  ]
})
export class RestaurantAddModule { }
