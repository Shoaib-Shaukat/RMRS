import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'add-menu-category',
        loadChildren: () => import('./add-menu-category/add-menu-category.module').then(module => module.AddMenuCategoryModule)
      },
      {
        path: 'menu-list',
        loadChildren: () => import('./menu-list/menu-list.module').then(module => module.MenuListModule)
      }, 
      {
        path: 'menu-add',
        loadChildren: () => import('./menu-add/menu-add.module').then(module => module.MenuAddModule)
      },
      {
        path: 'menu-edit',
        loadChildren: () => import('./menu-add/menu-add.module').then(module => module.MenuAddModule)
      },
      {
        path: 'deals',
        loadChildren: () => import('./deals/deals.module').then(module => module.DealsModule)
      }, 
      {
        path: 'deals-list',
        loadChildren: () => import('./deals-list/deals-list.module').then(module => module.DealsListModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
