import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationListRoutingModule } from './reservation-list-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReservationListRoutingModule,
    SharedModule
  ]
})
export class ReservationListModule { }
