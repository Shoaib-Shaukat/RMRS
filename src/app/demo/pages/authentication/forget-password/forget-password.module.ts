import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgetPasswordRoutingModule } from './forget-password-routing.module';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ForgetPasswordRoutingModule,
    SharedModule,
    NgbProgressbarModule
  ]
})
export class ForgetPasswordModule { }
