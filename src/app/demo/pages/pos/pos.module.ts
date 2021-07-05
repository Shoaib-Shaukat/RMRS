import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosRoutingModule } from './pos-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PosRoutingModule,
    SharedModule
  ]
})
export class PosModule { }
