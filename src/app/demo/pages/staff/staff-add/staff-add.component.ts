import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/shared/services/menu.service';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-staff-add',
  templateUrl: './staff-add.component.html',
  styleUrls: ['./staff-add.component.scss']
})
export class StaffAddComponent implements OnInit {
  addStaffForm: FormGroup;
  cancel: boolean;
  xyz: boolean;
  StaffID: any;
  RestaurantID: any;
  error: any;
  loading: boolean;
  RestaurantName: any;
  RestaurantId: any;
  RestaurantList: any;
  OwnerId: any;
  //PermissionStructure: any;
  PermisionList: any;
  forOrder: boolean = false;
  constructor(private formBuilder: FormBuilder, private menuService: MenuService, private router: Router, private restaurantService: RestaurantService, private toastr: ToastrService) {
    //this.PermissionStructure = [];
    this.PermisionList = [];
  }

  ngOnInit(): void {
    //this.permissionStructure();
    this.addStaffForm = this.formBuilder.group({
      StaffName: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Za-z].{2,}")]),
      Password: new FormControl('', [
        Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]),
      CNICNo: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]{13}$")]),
      DOB: new FormControl('', [
        Validators.required]),
      Address: new FormControl('', [
        Validators.required]),
      UserName: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Za-z].{2,}")]),
      MobileNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(".{10,10}")]),
      Permission: new FormControl('', []),

    }
    );

    this.RestaurantID = localStorage.getItem("restaurantIdforProfile");
    this.getAllRestaurantList();

    this.menuService.updateStaffList(this.addStaffForm);

    this.addStaffForm.controls['StaffName'].patchValue(this.menuService.staffMember.staffName);
    this.addStaffForm.controls['DOB'].patchValue(this.menuService.staffMember.DOB);
    this.addStaffForm.controls['ContactNumber'].patchValue(this.menuService.staffMember.contactNumber);
    this.addStaffForm.controls['UserName'].patchValue(this.menuService.staffMember.userName);
    this.addStaffForm.controls['CNICNo'].patchValue(this.menuService.staffMember.cnicNo);
    this.addStaffForm.controls['Address'].patchValue(this.menuService.staffMember.address);
    this.addStaffForm.controls['Password'].patchValue(this.menuService.staffMember.password);
    this.addStaffForm.controls['Permission'].patchValue(this.menuService.staffMember.permission);

    this.xyz = this.menuService.decide;
  }
  showSuccess() {
    this.toastr.success('', 'Staff Added', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  showError() {
    this.toastr.error('', 'Staff Not Added!', {
      timeOut: 3000,
      'progressBar': true,
    });
  }

  getAllRestaurantList() {
    debugger
    this.OwnerId = localStorage.getItem("OwnerID");
    this.restaurantService.AllRestaurants(this.OwnerId).subscribe(
      data => {
        this.RestaurantList = data['data'];
        //this.getRestaurantID(this.RestaurantList['data']);
        this.restaurantService.addRestaurantListinStaff(this.RestaurantList);
        // this.RestaurantName = this.restaurantService.RestaurantListinAddStaff.data;
        // this.RestaurantId = this.restaurantService.RestaurantListinAddStaff;
      },
      err => {
        this.error = err.error.data.description;
        this.loading = false;

      }
    );
  }
  onSubmit() {
    // this.addStaffForm.markAllAsTouched()
    // this.cancel = true;
    // this.menuService.cancelF(this.cancel);
    // this.router.navigate(['/staff/staff-list']);
    debugger

    let body =
    {
      StaffName: this.addStaffForm.controls['StaffName'].value,
      Password: this.addStaffForm.controls['Password'].value,
      CNIC: this.addStaffForm.controls['CNICNo'].value,
      Address: this.addStaffForm.controls['Address'].value,
      Username: this.addStaffForm.controls['UserName'].value,
      MobileNumber: this.addStaffForm.controls['MobileNumber'].value,
      //RestaurantID: localStorage.getItem("RestaurantID")
      RestaurantID: localStorage.getItem("restaurantIdforProfile"),
      Permission: this.PermisionList
    }
    this.restaurantService.addStaff(body).subscribe(
      data => {
        this.showSuccess();
        this.StaffID = data.data.StaffID;
        this.restaurantService.updateStaffID(this.StaffID);

        this.restaurantService.updateStaffList(this.addStaffForm);
        this.restaurantService.AllStaff(this.RestaurantID);
        this.router.navigate(['/staff/staff-list']);
      },
      err => {
        this.showError();
        this.error = err.error.data.description;
        this.loading = false;

      });

  }
  canceled() {
    this.router.navigate(['/staff/staff-list']);
  }
  // permissionStructure() {
  //   this.PermissionStructure = [
  //     {
  //       'Order': [
  //         {
  //           'Status': false,
  //           'View': false,
  //           'Ready': false,
  //           'In-Queue': false,
  //           'Payment-Made': false
  //         }
  //       ]
  //     },
  //     {
  //       'POS': [
  //         {
  //           'Status': false
  //         }
  //       ]
  //     },
  //     {
  //       'Menu': [
  //         {
  //           'Status': false
  //         }
  //       ]
  //     },
  //     {
  //       'Staff': [
  //         {
  //           'Status': false
  //         }
  //       ]
  //     },
  //     {
  //       'Restaurant': [
  //         {
  //           'Status': false
  //         }
  //       ]
  //     }
  //   ];
  // }

  permissionChecked(permissionChecked: boolean, name: any) {

    if (permissionChecked) {
      this.PermisionList.push(name);
      this.showOptions();
    }
    else {
      for (let i = 0; i < this.PermisionList.length; i++) {
        if (this.PermisionList[i] == name) {
          this.PermisionList.splice(i, 1);
        }
      }
    }

  }
  hideOptions() {
    for (let i = 0; i < this.PermisionList.length; i++) {
      this.forOrder = false;
      if ("Order" == this.PermisionList[i]) {
        this.PermisionList.splice(i, 1);
      }
      if ("Order-Edit" == this.PermisionList[i]) {
        this.PermisionList.splice(i, 1);
      }
      if ("Order-View" == this.PermisionList[i]) {
        this.PermisionList.splice(i, 1);
      }
      if ("Order-Accept" == this.PermisionList[i]) {
        this.PermisionList.splice(i, 1);
      }
      if ("Order-PaymentMade" == this.PermisionList[i]) {
        this.PermisionList.splice(i, 1);
      }
      if ("Order-PrintInvoice" == this.PermisionList[i]) {
        this.PermisionList.splice(i, 1);
      }
      if ("Take-Order" == this.PermisionList[i]) {
        this.PermisionList.splice(i, 1);
      }
    }
  }
  showOptions() {
    for (let i = 0; i < this.PermisionList.length; i++) {
      if ("Order" == this.PermisionList[i]) {
        this.forOrder = true;
        break;
      }
    }
  }

}