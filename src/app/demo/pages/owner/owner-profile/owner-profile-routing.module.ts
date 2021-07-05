import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnerProfileComponent } from './owner-profile.component';


const routes: Routes = [
  {
    path: '',
    component: OwnerProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerProfileRoutingModule { }
