import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffAddRoutingModule } from './staff-add-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StaffAddRoutingModule,
    SharedModule
  ]
})
export class StaffAddModule { }
