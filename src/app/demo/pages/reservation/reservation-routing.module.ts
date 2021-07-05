import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'reservation-list',
        loadChildren: () => import('./reservation-list/reservation-list.module').then(module => module.ReservationListModule)
      },
      {
        path: 'reservation-add',
        loadChildren: () => import('./reservation-add/reservation-add.module').then(module => module.ReservationAddModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
