import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthSigninRoutingModule } from './auth-signin-routing.module';
import { AuthSigninComponent } from './auth-signin.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    AuthSigninRoutingModule,
    SharedModule,
    NgbProgressbarModule
  ],
  declarations: [AuthSigninComponent],
  providers: [AuthService]
})
export class AuthSigninModule { }
