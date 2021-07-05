import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuListRoutingModule } from './menu-list-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuListComponent } from './menu-list.component';


@NgModule({
  declarations: [MenuListComponent],
  imports: [
    CommonModule,
    MenuListRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTabsetModule
  ]
})
export class MenuListModule { }
