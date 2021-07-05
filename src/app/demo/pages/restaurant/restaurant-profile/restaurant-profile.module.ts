import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantProfileRoutingModule } from './restaurant-profile-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantProfileComponent } from './restaurant-profile.component';
import { BarRatingModule } from 'ngx-bar-rating';


@NgModule({
  declarations: [RestaurantProfileComponent],
  imports: [
    CommonModule,
    RestaurantProfileRoutingModule,
    SharedModule,
    NgbTabsetModule,
    BarRatingModule
  ]
})
export class RestaurantProfileModule { }
