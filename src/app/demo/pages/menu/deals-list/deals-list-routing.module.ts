import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealsListComponent } from './deals-list.component';


const routes: Routes = [{
  path: '',
  component: DealsListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealsListRoutingModule { }
