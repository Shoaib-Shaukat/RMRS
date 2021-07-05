import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { ChartDB } from '../../../fack-db/chart-data';
import { ApexChartService } from '../../../theme/shared/components/chart/apex-chart/apex-chart.service';

@Component({
  selector: 'app-dash-analytics',
  templateUrl: './dash-analytics.component.html',
  styleUrls: ['./dash-analytics.component.scss']
})
export class DashAnalyticsComponent implements OnInit {
  public chartDB: any;
  public dailyVisitorStatus: string;
  public dailyVisitorAxis: any;
  public deviceProgressBar: any;
  countofrestaurant: any;
  totalNoOfOders: any;
  OwnerId: any;
  RestaurantList: any;
  RestaurantsCount: any;
  orderList: any;
  RestaurantID: any;
  ordersCount: number = 0;
  constructor(public apexEvent: ApexChartService, private restaurantService: RestaurantService) {
    this.chartDB = ChartDB;
    this.dailyVisitorStatus = '1y';

    this.deviceProgressBar = [
      {
        type: 'success',
        value: 66
      }, {
        type: 'primary',
        value: 26
      }, {
        type: 'danger',
        value: 8
      }
    ];
  }


  ngOnInit() {
    this.countofrestaurant = localStorage.getItem("countOfRestaurant");
    this.totalNoOfOders = localStorage.getItem("TotalOrders");
    this.OwnerId = localStorage.getItem("OwnerID");
    this.RestaurantID = localStorage.getItem("restaurantIdforProfile");
    this.getRestaurantList();
  }
  getRestaurantList() {
    this.restaurantService.AllRestaurants(this.OwnerId).subscribe(
      data => {
        this.RestaurantList = data['data'];
        this.RestaurantsCount = this.RestaurantList.length;
        this.RestaurantID = this.RestaurantList[0].RestaurantID;
        for (let i = 0; i < this.RestaurantsCount; i++) {
          this.RestaurantID = this.RestaurantList[i].RestaurantID;
          this.restaurantOrder();

        }
      },
      err => {

      }
    );

  }
  restaurantOrder() {
    this.restaurantService.RestaurantOrder(this.RestaurantID).subscribe(
      data => {
        this.orderList = data['data'];
        this.ordersCount = (this.ordersCount) + (this.orderList.length);
      },
      err => {
      }
    );
  }
}
