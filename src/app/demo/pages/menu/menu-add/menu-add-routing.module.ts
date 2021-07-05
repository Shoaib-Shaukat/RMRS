import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuAddComponent } from './menu-add.component';


const routes: Routes = [
  {
    path: '',
    component: MenuAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuAddRoutingModule { }
