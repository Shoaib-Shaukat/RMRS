import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuAddComponent } from './menu-add/menu-add.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AddMenuCategoryComponent } from './add-menu-category/add-menu-category.component';
import { DealsListComponent } from './deals-list/deals-list.component';


@NgModule({
  declarations: [MenuAddComponent, AddMenuCategoryComponent, DealsListComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    SharedModule
  ]
})
export class MenuModule { }
