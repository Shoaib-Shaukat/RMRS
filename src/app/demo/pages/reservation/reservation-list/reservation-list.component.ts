import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/shared/services/menu.service';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {
  Reservation: any;
  cancel: boolean;
  abc: boolean = false;
  RestaurantID: any;
  reservationList: any;
  reservationStatus: any;
  firstStatus : string = "AWAITING_ACCEPTANCE";
  secondStatus : string = "RESERVED";
  Descrpition: any;
  ReservationID: any;
  constructor(private menuService: MenuService, private router: Router, private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.Reservation = this.menuService.reservationFields;
    this.cancel = this.menuService.cancelD;
    this.RestaurantID = localStorage.getItem("restaurantIdforProfile");
    this.viewReservation();
  }
  addReservation() {
    this.menuService.decision(this.abc);
    this.router.navigate(['/reservation/reservation-add']);
  }
  viewReservation() {
    this.restaurantService.ReservationList(this.RestaurantID).subscribe(
      data => {
        this.reservationList = data['data'].result;
        this.reservationList.reverse();
      },
      err => {
      }
    );
  }
  rejectReservation(Reservationid) {
    this.ReservationID = Reservationid;
     this.restaurantService.rejectReservation(this.ReservationID).subscribe(
       data => {
        this.Descrpition = data['data'].description;
        this.ngOnInit();
       },
       err => {

       }
     );
  }
  acceptReservation(Reservationid) {
    let body = {
      ReservationID : Reservationid,
      CurrentStatus : this.firstStatus
    }
     this.restaurantService.acceptReservationForCustomer(body).subscribe(
       data => {
        this.Descrpition = data['data'].description;
        this.ngOnInit();
       },
       err => {

       }
     );
  }
  acceptReservationTwo(Reservationid) {
    let body = {
      ReservationID : Reservationid,
      CurrentStatus : this.secondStatus
    }
     this.restaurantService.acceptReservationForCustomer(body).subscribe(
       data => {
        this.Descrpition = data['data'].description;
        this.ngOnInit();
       },
       err => {

       }
     );
  }
}
