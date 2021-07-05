import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  RestaurantID: any;
  orderList: any;
  status: boolean = false;
  Orderid: any;
  countTotalOrders: number = 0;
  constructor(private router: Router, private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.RestaurantID = localStorage.getItem("restaurantIdforProfile");
    this.restaurantOrder();
  }

  restaurantOrder() {

    this.restaurantService.RestaurantOrder(this.RestaurantID).subscribe(
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
  }
  viewOrder(OrderID: any) {
    this.Orderid = OrderID;
    localStorage.setItem('OrderID', this.Orderid);
    //this.restaurantService.RestaurantOrderStatus(OrderID);
    this.router.navigate(['/order/order-history-detail']);
  }
}
