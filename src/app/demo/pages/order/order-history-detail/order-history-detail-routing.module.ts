import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderHistoryDetailComponent } from './order-history-detail.component';


const routes: Routes = [
  {
    path: '',
    component: OrderHistoryDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderHistoryDetailRoutingModule { }
