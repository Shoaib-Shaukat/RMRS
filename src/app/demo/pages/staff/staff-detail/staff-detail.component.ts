import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/shared/services/menu.service';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.scss']
})
export class StaffDetailComponent implements OnInit {
  detailOfStaff: any;
  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.staffDetail();
  }

  staffDetail() {
    if (this.menuService.detailOfStaff != undefined) {
      this.detailOfStaff = this.menuService.detailOfStaff;
    }
  }
}
