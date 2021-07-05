import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/shared/services/menu.service';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-restaurant-profile',
  templateUrl: './restaurant-profile.component.html',
  styleUrls: ['./restaurant-profile.component.scss']
})
export class RestaurantProfileComponent implements OnInit {
  Restaurant: any;
  mode: boolean = false;
  RestaurantId: any;
  error: any;
  loading: boolean;
  RestaurantProfile: any;
  foo: any;
  Restaurantcategory: any;
  Categoryid: any;
  onlyID: any;
  RestaurantName: any;
  restaurantProfileInfo: any;
  orderList: any;
  imagePath: any;
  NTNnumber: any;
  Address: any;
  RestaurantCategory: any;
  Rating: any;
  allitemsList: any;
  RatingCount: any;
  ListofDeals: any;
  private flag : boolean = false;
  discountsArr: any;
  constructor(private menuService: MenuService, private router: Router, private restaurantService: RestaurantService, private toastr: ToastrService) {

  }
  
  ngOnInit(): void {
    this.mode = false;
    this.flag = true;
    this.RestaurantId = localStorage.getItem("restaurantIdforProfile");
    this.viewRestaurant();
    this.DealsList();
    this.restaurantOrder();
    this.itemsList();

  }
  ngOnDestroy(): void {
    this.flag = false;
  }
  viewRestaurant() {
    this.restaurantService.restaurantView(this.RestaurantId).subscribe(
      data => {
        this.restaurantProfileInfo = data['data'];
        debugger
        this.discountsArr = this.restaurantProfileInfo.Discounts;
        this.imagePath = data['data'].Image;
        this.RestaurantName = data['data'].RestaurantName;
        this.NTNnumber = data['data'].NTNNumber;
        this.Address = data['data'].Address;
        this.RestaurantCategory = data['data'].RestaurantCategory;
        this.Rating = data['data'].Rating;
        this.RatingCount = data['data'].RatingCount;
        this.restaurantService.updateCategoryNameforitemslist(this.Restaurantcategory);
        localStorage.setItem("RestaurantCategoryName", this.Restaurantcategory);
        this.Categoryid = data['data'].CategoryID;
        this.restaurantService.updateCategoryid(this.Categoryid);
        localStorage.setItem("RestaurantCategoryID", this.Categoryid);
        localStorage.setItem("restaurantName", this.RestaurantName);
        this.onlyID = data['data']._id;
        localStorage.setItem("onlyID", this.onlyID);
        this.RestaurantProfile = data['data'];

      },
      err => {
        this.error = err.error.data.description;
        this.loading = false;
      }
    );
  }
  restaurantOrder() {

    this.restaurantService.RestaurantOrder(this.RestaurantId).subscribe(
      data => {
        this.orderList = data['data'];
        this.orderList.reverse();
        for(let i=0; i< this.orderList.length;i++)
        {
          this.orderList[i].TotalAmount = Math.round(this.orderList[i].TotalAmount);
        }
        this.restaurantService.updateOrderDetail(this.orderList);
      },
      err => {
      }
    );
    // setTimeout(() => {
    //   if(this.flag){
    //      this.restaurantOrder();
    //   }
    //  }, 5000);
  }

  DealsList() {
    
    this.restaurantService.getDealsList(this.RestaurantId).subscribe(
      data => {
        if (data['Message'] == "Success") {
          
          this.ListofDeals = data['data'];
          // for (let i = 0; i < this.ListofDeals.length; i++) {
          //   this.MenuItems[i] = this.ListofDeals[i].MenuItems;
          // }
        } 
      },
      err => {
      }
    );
  }
  itemsList() {
    this.restaurantService.getItemsList(this.RestaurantId).subscribe(
      data => {
        this.allitemsList = data['data'];
        this.allitemsList.reverse();
        for(let i =0 ;i<this.allitemsList.length;i++){
          if(this.allitemsList[i].isVariant == true){
            this.allitemsList[i].CalculatedPrice = this.allitemsList[i].Variant[0].CalculatedPrice;
          }
        }
      },
      err => {
      }
    );

  }
  editRestaurant() {
    this.mode = true;
    this.menuService.decision(this.mode);
    this.restaurantService.editornot(this.mode);
    this.restaurantService.EditRestaurant(this.RestaurantProfile);

    this.menuService.editRestaurant(this.restaurantProfileInfo);
    this.router.navigate(['/restaurant/restaurant-edit']);
  }

  // ngOnInit(): void {
  //   this.Restaurant = this.restaurantService.signUpForm;

  //   this.Email = this.restaurantService.Email;
  // }

  // editRestaurant() {
  //   this.mode = true;
  //   this.menuService.decision(this.mode);

  //   let restaurantInfo = {
  //     nameOfRestaurant: this.menuService.restaurantFields.value.NameOfRestaurant,
  //     address: this.menuService.restaurantFields.value.Address,
  //     ntn: this.menuService.restaurantFields.value.NTN,
  //     RestaurantCategory: this.menuService.restaurantFields.value.RestaurantCategory,
  //     TotalDevices: this.menuService.restaurantFields.value.TotalDevices,
  //     RestaurantVerified: this.menuService.restaurantFields.value.RestaurantVerified,
  //     RestaurantType: this.menuService.restaurantFields.value.RestaurantType,
  //     weekdaysOpenTime: this.menuService.restaurantFields.value.WeekdaysOpenTime,
  //     weekdaysCloseTime: this.menuService.restaurantFields.value.WeekdaysCloseTime,
  //     weekendOpenTime: this.menuService.restaurantFields.value.WeekendOpenTime,
  //     weekendCloseTime: this.menuService.restaurantFields.value.WeekendCloseTime,

  //   // }

  //   this.menuService.preFilledRestaurant(this.Restaurant);
  //   this.router.navigate(['/restaurant/restaurant-add']);
  // }
}
