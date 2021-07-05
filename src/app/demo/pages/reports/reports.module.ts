import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [SalesReportComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    DataTablesModule,
  ]
})
export class ReportsModule { }
