import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'order-list',
        loadChildren: () => import('./order-list/order-list.module').then(module => module.OrderListModule)
      },
      {
        path: 'order-history',
        loadChildren: () => import('./order-history/order-history.module').then(module => module.OrderHistoryModule)
      },
      {
        path: 'order-history-detail',
        loadChildren: () => import('./order-history-detail/order-history-detail.module').then(module => module.OrderHistoryDetailModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
