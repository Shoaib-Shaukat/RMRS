import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-deals-list',
  templateUrl: './deals-list.component.html',
  styleUrls: ['./deals-list.component.scss']
})
export class DealsListComponent implements OnInit {
  RestaurantID: any;
  ListofDeals: any;
  description: any;
  checkDeal: boolean = false;
  MenuItems: any;
  DealId: any;
  constructor(private router: Router, private restaurantService: RestaurantService, private toastr: ToastrService) {
    this.MenuItems = [];
   }

  ngOnInit(): void {
    this.RestaurantID = localStorage.getItem("restaurantIdforProfile");
    this.DealsList();
  }
  
  DealsList() {
    
    this.restaurantService.getDealsList(this.RestaurantID).subscribe(
      data => {
        if (data['Message'] == "Success") {
          this.checkDeal = true;
          this.ListofDeals = data['data'];
          for (let i = 0; i < this.ListofDeals.length; i++) {
            this.MenuItems[i] = this.ListofDeals[i].MenuItems;
          }
        } 

        if (data['Message'] == "Failure") {
          this.checkDeal = false;
          this.description = "No Deals avialable!";
        }
      },
      err => {
      }
    );
  }
  showSuccess() {
    this.toastr.success('', 'Deal Deleted', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  showError() {
    this.toastr.error('', 'Deal Not Deleted!', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  showSuccessAllDelete() {
    this.toastr.success('', 'All Deals Deleted', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  showErrorAllDelete() {
    this.toastr.error('', 'All Deals Not Deleted!', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  setDeleteDeal(dealID: any){
    this.DealId = dealID;
  }
  confirmDelete(){
    this.restaurantService.deleteDeal(this.DealId).subscribe(
      data => {
        this.showSuccess();
        this.ngOnInit();
      },
      err => {
        this.showError();
      }
    );
  }
  confirmAllDelete(){
    this.restaurantService.deleteAllDeals(this.RestaurantID).subscribe(
      data => {
        this.showSuccessAllDelete();
        this.ngOnInit();
      },
      err => {
        this.showErrorAllDelete();
      }
    );
  }
}
