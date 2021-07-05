import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMenuCategoryComponent } from './add-menu-category.component';


const routes: Routes = [
  {
    path: '',
    component: AddMenuCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddMenuCategoryRoutingModule { }
