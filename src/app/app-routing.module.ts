import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/auth/signin',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./demo/dashboard/dashboard.module').then(module => module.DashboardModule)
      },
      {
        path: 'layout',
        loadChildren: () => import('./demo/pages/layout/layout.module').then(module => module.LayoutModule)
      },
      {
        path: 'basic',
        loadChildren: () => import('./demo/ui-elements/ui-basic/ui-basic.module').then(module => module.UiBasicModule)
      },
      {
        path: 'forms',
        loadChildren: () => import('./demo/pages/form-elements/form-elements.module').then(module => module.FormElementsModule)
      },
      {
        path: 'tbl-bootstrap',
        loadChildren: () => import('./demo/pages/tables/tbl-bootstrap/tbl-bootstrap.module').then(module => module.TblBootstrapModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./demo/pages/core-chart/core-chart.module').then(module => module.CoreChartModule)
      },
      {
        path: 'maps',
        loadChildren: () => import('./demo/pages/core-maps/core-maps.module').then(module => module.CoreMapsModule)
      },
      {
        path: 'sample-page',
        loadChildren: () => import('./demo/pages/sample-page/sample-page.module').then(module => module.SamplePageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('./demo/pages/menu/menu.module').then(module => module.MenuModule)
      },
      {
        path: 'staff',
        loadChildren: () => import('./demo/pages/staff/staff.module').then(module => module.StaffModule)
      },
      {
        path: 'restaurant',
        loadChildren: () => import('./demo/pages/restaurant/restaurant.module').then(module => module.RestaurantModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./demo/pages/order/order.module').then(module => module.OrderModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./demo/pages/profile/profile.module').then(module => module.ProfileModule)
      },
      {
        path: 'pos',
        loadChildren: () => import('./demo/pages/pos/pos.module').then(module => module.PosModule)
      },
      {
        path: 'pos/edit',
        loadChildren: () => import('./demo/pages/pos/pos.module').then(module => module.PosModule)
      },
      {
        path: 'reservation',
        loadChildren: () => import('./demo/pages/reservation/reservation.module').then(module => module.ReservationModule)
      },
      {
        path: 'owner',
        loadChildren: () => import('./demo/pages/owner/owner.module').then(module => module.OwnerModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./demo/pages/reports/reports.module').then(module => module.ReportsModule)
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then(module => module.AuthenticationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
