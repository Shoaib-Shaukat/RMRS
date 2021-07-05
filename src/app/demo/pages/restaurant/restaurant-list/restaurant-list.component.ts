import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/shared/services/menu.service';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
  Restaurant: any;
  cancel: boolean;
  RestaurantID: any;
  RestaurantList: any;
  Address: any;
  OwnerID: any;
  NTNNumber: any;
  RestaurantCategory: any;
  TotalDevices: any;
  RestaurantVerified: any;
  RestaurantType: any;
  CategoryID: any;
  error: any;
  loading: boolean;
  OwnerId: any;
  restriction: boolean = false;
  foo: any;
  constructor(private menuService: MenuService, private router: Router, private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.restriction = false;

    this.restaurantService.sendFlag(this.restriction);
    this.OwnerId = localStorage.getItem("OwnerID");

    this.getRestaurantList();



  }
  getRestaurantList() {
    this.Restaurant = this.restaurantService.signUpForm;
    this.cancel = this.menuService.cancelD;
    this.restaurantService.AllRestaurants(this.OwnerId).subscribe(
      data => {
        this.RestaurantList = data['data'];
        this.restaurantService.addRestaurantListinStaff(this.RestaurantList);
      },
      err => {
        this.error = err.error.data.description;
        this.loading = false;

      }
    );

  }
  addRestaurant() {
    this.ngOnInit();
    this.router.navigate(['/restaurant/restaurant-add']);
  }
  viewRestaurant(RestaurantID: any) {
    
    this.restriction = true;
    localStorage.setItem("restaurantIdforProfile", RestaurantID);
    this.restaurantService.sendFlag(this.restriction);
    this.restaurantService.updateRestaurantID(RestaurantID);
    // this.foo = true;
    // localStorage.setItem("foo", this.foo);
    this.router.navigate(['/restaurant/restaurant-profile']);
  }
}
