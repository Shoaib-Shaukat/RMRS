import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { ToastrService } from 'ngx-toastr';
import { MenuService } from 'src/app/shared/services/menu.service';
@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {
  signInForm: FormGroup;
  staffSignInForm: FormGroup;
  returnUrl: string;
  error = '';
  loading = false;
  RestaurantID: any;
  Token: string = "";
  OwnerID: string = "";
  CustomerEmail: string;
  verifySigned: boolean;
  StaffID: any;
  isStaff: any = "false";
  admin: boolean = true;
  employee: boolean = false;

  constructor(private fb: FormBuilder, private menuService: MenuService,
    private router: Router, private authService: AuthService, private restaurantService: RestaurantService, private toastr: ToastrService) {
     }


  ngOnInit() {
    this.signInForm = this.fb.group({
      Email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      Password: new FormControl('', [
        Validators.required]),
    });
    this.staffSignInForm = this.fb.group({
      Username: new FormControl('', [
        Validators.required]),
      Password: new FormControl('', [
        Validators.required]),
    });
  }
  showSuccess() {
    this.toastr.success('Signed In Successfully', 'Welcome', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  showError() {
    this.toastr.error('Unable to Sign In', 'Sorry', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  runAsAdmin() {
    this.admin = true;
    this.employee = false;
    this.signInForm.reset();
  }
  runAsEmp() {
    this.admin = false;
    this.employee = true;
    this.signInForm.reset();
  }
  onSubmit() {
    let bodyForOwner =
    {
      Email: this.signInForm.controls['Email'].value,
      Password: this.signInForm.controls['Password'].value
    }
    let bodyForStaff =
    {
      Username: this.staffSignInForm.controls['Username'].value,
      Password: this.staffSignInForm.controls['Password'].value
    }
    if (this.admin == true) {
      this.authService.AuthService_Login(bodyForOwner).subscribe(
        data => {
          this.showSuccess();
          this.OwnerID = data.data.OwnerID;
          localStorage.setItem("OwnerID", this.OwnerID);
          this.isStaff = "false";
          localStorage.setItem("isStaff", this.isStaff);
          this.restaurantService.updateOwnerID(this.OwnerID);
          this.router.navigate(['/dashboard/analytics']);
        },
        err => {
          this.showError();
          this.error = err.error.data.description;
          this.loading = false;

        }
      );
    }
    else {
      this.authService.StaffService_Login(bodyForStaff).subscribe(
        data => {
          this.showSuccess();
          this.StaffID = data.data.StaffID;
          //this.RestaurantID = data.data.RestaurantID;
          localStorage.setItem("StaffID", this.StaffID);
          this.isStaff = "true";
          localStorage.setItem("isStaff", this.isStaff);
          localStorage.setItem("permissionArr", JSON.stringify(data.data.Permission));
          //localStorage.setItem("permissionArr", data.data.Permission[n]);
          //localStorage.setItem("restaurantIdforProfile", this.RestaurantID);
          //localStorage.setItem("RestaurantID", this.RestaurantID);
          this.menuService.setStaff(data.data.Permission);
          //this.restaurantService.updateOwnerID(this.OwnerID);
          this.router.navigate(['/dashboard/analytics']);
        },
        err => {
          this.showError();
          this.error = err.error.data.description;
          this.loading = false;

        }
      );
    }
  }

}