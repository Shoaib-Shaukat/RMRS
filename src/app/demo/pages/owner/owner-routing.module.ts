import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'owner-dashboard',
        loadChildren: () => import('./owner-dashboard/owner-dashboard.module').then(module => module.OwnerDashboardModule)
      },
      {
        path: 'owner-profile',
        loadChildren: () => import('./owner-profile/owner-profile.module').then(module => module.OwnerProfileModule)
      },
      {
        path: 'owner-edit',
        loadChildren: () => import('./owner-edit/owner-edit.module').then(module => module.OwnerEditModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
