import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerDashboardRoutingModule } from './owner-dashboard-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPopoverModule, NgbProgressbarModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OwnerDashboardRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbProgressbarModule,
    NgbPopoverModule,
    NgbTabsetModule
  ]
})
export class OwnerDashboardModule { }
