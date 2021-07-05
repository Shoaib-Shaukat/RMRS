import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/shared/services/menu.service';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reservation-add',
  templateUrl: './reservation-add.component.html',
  styleUrls: ['./reservation-add.component.scss']
})
export class ReservationAddComponent implements OnInit {
  reservationForm: FormGroup;
  cancel: boolean;
  xyz: boolean;
  RestaurantID: any;
  RestaurantName: any;
  CustomerID: any = "";
  Description: any;
  constructor(private formBuilder: FormBuilder, private menuService: MenuService, private router: Router, private restaurantService: RestaurantService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      Name: new FormControl('', [
        Validators.required]),
      MobileNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(".{11,11}")]),
      Date: new FormControl('', [
        Validators.required]),
      NoOfGuest: new FormControl('', [
        Validators.required])
    });
    this.menuService.updateReservationList(this.reservationForm);

    this.xyz = this.menuService.decide;
    this.RestaurantID = localStorage.getItem("restaurantIdforProfile");
    this.RestaurantName = localStorage.getItem("restaurantName");
  }
  showSuccess() {
    this.toastr.success('', 'Reservation Added', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  showError() {
    this.toastr.error('', 'Reservation Not Added!', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  onSubmit() {
    this.cancel = true;
    this.menuService.cancelF(this.cancel);
    let body = {
      RestaurantName: this.RestaurantName,
      RestaurantID: this.RestaurantID,
      CustomerID: this.CustomerID,
      CustomerName: this.reservationForm.controls['Name'].value,
      NumberOfPeople: this.reservationForm.controls['NoOfGuest'].value,
      ReservationTime: this.reservationForm.controls['Date'].value,
      MobileNumber: this.reservationForm.controls['MobileNumber'].value,
    }
    this.restaurantService.addReservation(body).subscribe(
      data => {
        this.showSuccess();
        this.router.navigate(['/reservation/reservation-list']);
      },
      err => {
        this.showError();
        this.Description = err.error.description;
      }
    );

  }
  canceled() {
    this.router.navigate(['/reservation/reservation-list']);
  }

}