import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnerDashboardComponent } from './owner-dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: OwnerDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerDashboardRoutingModule { }
