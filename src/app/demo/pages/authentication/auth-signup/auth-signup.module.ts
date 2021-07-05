import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthSignupRoutingModule } from './auth-signup-routing.module';
import { AuthSignupComponent } from './auth-signup.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    AuthSignupRoutingModule,
    SharedModule,
    NgbProgressbarModule
  ],
  declarations: [AuthSignupComponent]
})
export class AuthSignupModule { }
