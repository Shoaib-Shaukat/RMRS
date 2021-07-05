import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'signup',
        loadChildren: () => import('./auth-signup/auth-signup.module').then(module => module.AuthSignupModule)
      },
      {
        path: 'signin',
        loadChildren: () => import('./auth-signin/auth-signin.module').then(module => module.AuthSigninModule)
      },
      {
        path: 'change-password',
        loadChildren: () => import('./change-password/change-password.module').then(module => module.ChangePasswordModule)
      },
      {
        path: 'forget-password',
        loadChildren: () => import('./forget-password/forget-password.module').then(module => module.ForgetPasswordModule)
      },
      {
        path: 'otp',
        loadChildren: () => import('./otp/otp.module').then(module => module.OtpModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
