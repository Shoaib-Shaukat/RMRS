import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/shared/services/menu.service';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {
  menu: any;
  condition: boolean = false;
  abc: boolean = false;
  cancel: boolean;
  Staff: any
  StaffList: any;
  error: any;
  loading: boolean;
  RestaurantID: any;
  StaffProfile: any;
  constructor(private menuService: MenuService, private router: Router, private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.RestaurantID = localStorage.getItem("restaurantIdforProfile");
    this.getRestaurantList();

    this.Staff = this.menuService.staff;
    this.condition = this.menuService.foo;

    this.cancel = this.menuService.cancelD;

  }

  getRestaurantList() {
    this.StaffList = this.restaurantService.addStaffForm;
    this.cancel = this.menuService.cancelD;
    // let body = {
    //   //restaurantid: this.restaurantService.restaurantID
    //   restaurantid: this.RestaurantID
    // }



    this.restaurantService.AllStaff(this.RestaurantID).subscribe(
      data => {
        this.StaffList = data['data'];
        this.StaffProfile = data['data'];

      },
      err => {
        this.error = err.error.data.description;
        this.loading = false;

      }
    );
  }
  addStaff() {
    this.menuService.decision(this.abc);
    this.ngOnInit();
    this.router.navigate(['/staff/staff-add']);
  }
  editStaff() {
    this.abc = true;
    this.menuService.decision(this.abc);

    this.restaurantService.EditStaff(this.StaffProfile);
    this.router.navigate(['/staff/staff-add']);

    // let staffMember = {
    //   staffName: this.menuService.staff.value.Name,
    //   DOB: this.menuService.staff.value.DOB,
    //   contactNumber: this.menuService.staff.value.ContactNumber,
    //   userName: this.menuService.staff.value.UserName,
    //   cnicNo: this.menuService.staff.value.CNICNo,
    //   address: this.menuService.staff.value.Address,
    //   password: this.menuService.staff.value.Password,
    //   permission: this.menuService.staff.value.Permission,
    // }

    //this.menuService.preFilledStaff(staffMember);
    // this.router.navigate(['/staff/staff-add']);
  }
  confirmDelete() {
    this.router.navigate(['/staff/staff-add']);
  }
  viewStaff(staffId: any) {
    for (let i = 0; i < this.StaffList.length; i++) {
      if (staffId == this.StaffList[i].StaffID) {
        this.menuService.staffDetail(this.StaffList[i]);
        this.router.navigate(['/staff/staff-detail']);
      }
    }
  }
}
