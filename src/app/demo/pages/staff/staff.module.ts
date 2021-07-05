import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffAddComponent } from './staff-add/staff-add.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { StaffDetailComponent } from './staff-detail/staff-detail.component';
import { NgxLetterImageAvatarModule } from 'ngx-letter-image-avatar';



@NgModule({
  declarations: [StaffListComponent, StaffAddComponent, StaffDetailComponent],
  imports: [
    CommonModule,
    StaffRoutingModule,
    SharedModule,
    NgxLetterImageAvatarModule
  ]
})
export class StaffModule { }
