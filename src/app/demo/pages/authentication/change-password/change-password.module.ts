import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    SharedModule,
    NgbProgressbarModule
    
  ],
  declarations: [ChangePasswordComponent]
})
export class ChangePasswordModule { }
