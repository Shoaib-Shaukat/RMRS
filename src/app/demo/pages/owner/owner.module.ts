import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { OwnerDashboardComponent } from './owner-dashboard/owner-dashboard.component';
import { OwnerProfileComponent } from './owner-profile/owner-profile.component';
import { OwnerEditComponent } from './owner-edit/owner-edit.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  declarations: [OwnerDashboardComponent, OwnerProfileComponent, OwnerEditComponent],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    SharedModule
  ]
})
export class OwnerModule { }
