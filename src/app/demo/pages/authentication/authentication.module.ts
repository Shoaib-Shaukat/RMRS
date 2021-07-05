import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { OtpComponent } from './otp/otp.component';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule,
    NgbProgressbarModule
  ],
  declarations: [ForgetPasswordComponent, OtpComponent]
})
export class AuthenticationModule { }
