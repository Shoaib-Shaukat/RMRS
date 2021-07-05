import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderHistoryDetailComponent } from './order-history-detail/order-history-detail.component';
import { NgxPrintModule } from 'ngx-print';
// import {NgxPrintModule} from '../../../../../node_modules/ngx-print';


@NgModule({
  declarations: [OrderListComponent, OrderHistoryComponent, OrderHistoryDetailComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    NgxPrintModule
  ]
})
export class OrderModule { }
