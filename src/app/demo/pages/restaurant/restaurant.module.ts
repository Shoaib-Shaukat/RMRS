import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RestaurantAddComponent } from './restaurant-add/restaurant-add.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { RestaurantProfileComponent } from './restaurant-profile/restaurant-profile.component';
import { BarRatingModule } from 'ngx-bar-rating';


@NgModule({
  declarations: [RestaurantAddComponent, RestaurantListComponent],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    SharedModule,
    BarRatingModule
  ]
})
export class RestaurantModule { }
