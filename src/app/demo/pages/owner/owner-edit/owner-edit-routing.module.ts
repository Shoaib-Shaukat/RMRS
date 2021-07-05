import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnerEditComponent } from './owner-edit.component';


const routes: Routes = [
  {
    path: '',
    component: OwnerEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerEditRoutingModule { }
