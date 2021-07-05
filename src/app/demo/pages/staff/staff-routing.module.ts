import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
  path: '',
  children: [
    {
      path: 'staff-list',
      loadChildren: () => import('./staff-list/staff-list.module').then(module => module.StaffListModule)
    }, 
    {
      path: 'staff-add',
      loadChildren: () => import('./staff-add/staff-add.module').then(module => module.StaffAddModule)
    }, 
    {
      path: 'staff-detail',
      loadChildren: () => import('./staff-detail/staff-detail.module').then(module => module.StaffDetailModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
