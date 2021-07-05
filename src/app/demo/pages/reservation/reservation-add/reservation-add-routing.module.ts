import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationAddComponent } from './reservation-add.component';


const routes: Routes = [
  {
    path: '',
    component: ReservationAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationAddRoutingModule { }
