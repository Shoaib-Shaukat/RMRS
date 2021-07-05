import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffDetailComponent } from './staff-detail.component';


const routes: Routes = [{
  path: '',
  component: StaffDetailComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffDetailRoutingModule { }
