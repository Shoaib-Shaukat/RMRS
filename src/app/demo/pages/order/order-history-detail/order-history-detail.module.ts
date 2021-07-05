import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderHistoryDetailRoutingModule } from './order-history-detail-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OrderHistoryDetailRoutingModule,
    SharedModule
  ]
})
export class OrderHistoryDetailModule { }
