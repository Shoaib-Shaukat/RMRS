import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export class AuthSignupComponent implements OnInit {
  signUpForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  message: string;
  constructor(private formBuilder: FormBuilder,
    private router: Router, private restaurantService: RestaurantService, private toastr: ToastrService) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      FullName: new FormControl('', [
        Validators.required]),
      FatherName: new FormControl('', [
        Validators.required]),
      DOB: new FormControl('', [
        Validators.required]),
      Gender: new FormControl('', [
        Validators.required]),
      CNICNo: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]{13}$")]),
      Nationality: new FormControl('', [
        Validators.required]),
      Email: new FormControl('', [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      Address: new FormControl('', [
        Validators.required]),
      CreatePassword: new FormControl('', [
        Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]),
      PhoneNo: new FormControl('', [
        Validators.required,
        Validators.pattern(".{9,9}")]),
      MobileNo: new FormControl('', [
        Validators.required,
        Validators.pattern(".{10,10}")]),
      Checkbox: new FormControl('', [
        Validators.required]),

    }

    );
  }
  showSuccess() {
    this.toastr.success('Kindly use signup credentials','Signup Successfull', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  showError() {
    this.toastr.error('','Signup not successful', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  showErrorForVerifyEmail() {
    this.toastr.error('Entered email already used!','Error', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  onSubmit() {

    this.signUpForm.markAllAsTouched()
    this.submitted = true;

    let verifyEmailBody = {
      "Email": this.signUpForm.value.Email,
      "PhoneNumber": this.signUpForm.value.PhoneNo
    }


    let body = {
      OwnerName: this.signUpForm.value.FullName,
      Email: this.signUpForm.value.Email,
      CNIC: this.signUpForm.value.CNICNo,
      DateOfBirth: this.signUpForm.value.DOB,
      Gender: this.signUpForm.value.Gender,
      Address: this.signUpForm.value.Address,
      PhoneNumber: this.signUpForm.value.PhoneNo,
      MobileNumber: this.signUpForm.value.MobileNo,
      FathersName: this.signUpForm.value.FatherName,
      Nationality: this.signUpForm.value.Nationality,
      Password: this.signUpForm.value.CreatePassword
  }


    this.restaurantService.verifyEmail(verifyEmailBody).subscribe(
      data => {
        //when email and phone number are not registrot sucess message is returned
        //Then call otp send api
        if (data.Message == 'Success') {
          // this.sessionService.signUpFormData = signUpFormValue;
          this.restaurantService.signUp(body).subscribe(
            data => {
              this.showSuccess();
              //sendOTP API Call
              this.router.navigate(['/auth/otp']);
            },
            err => {
              
            }
          );
          //this.router.navigate(['/auth/signin']);
          this.sendOTP(verifyEmailBody);

        }
        if (data.Message == 'Failure'){
          this.showErrorForVerifyEmail();
        }
      },

      err => {
        this.showError();
        this.error = err.error.data.description;
      }
    );

  }

  sendOTP(verifyEmailBody: any) {
    this.restaurantService.sendOTP(verifyEmailBody).subscribe(
      (data) => {
        //when email and phone number are not registrot sucess message is returned
        //Then call otp send api
        if (data.Message == 'Success') {
          this.router.navigate(['/auth/otp']);
        }

      },
      err => {
        // this.error = err.data.description;

      }


    );
  }

}

