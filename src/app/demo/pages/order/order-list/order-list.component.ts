import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { registerLocaleData } from '@angular/common';
import localFr from '@angular/common/locales/fr'
import { MenuService } from 'src/app/shared/services/menu.service';
registerLocaleData(localFr, 'fr');
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  RestaurantID: any;
  orderList: any;
  status: boolean = false;
  Orderid: any;
  Permission: any;
  countTotalOrders: number = 0;
  orderView: boolean = false;
  orderEdit: boolean = false;
  orderAccept: boolean = false;
  takeOrder: boolean = false;
  private flag: boolean = false;
  constructor(private menuService: MenuService, private router: Router, private restaurantService: RestaurantService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.flag = true;
    this.RestaurantID = localStorage.getItem("restaurantIdforProfile");
    this.restaurantOrder();

    this.setPermission();

  }
  setPermission() {
    if (localStorage.getItem("isStaff") == "true") {
      this.Permission = JSON.parse(localStorage.getItem("permissionArr"));
      for (let i = 0; i < this.Permission.length; i++) {
        if (this.Permission[i] == 'Order-View') {
          this.orderView = true;
        }
        else if (this.Permission[i] == 'Order-Edit') {
          this.orderEdit = true;
        }
        else if (this.Permission[i] == 'Order-Accept') {
          this.orderAccept = true;
        }
        else if (this.Permission[i] == 'Take-Order') {
          this.takeOrder = true;
        }
      }
    }
  }
  ngOnDestroy(): void {
    this.flag = false;
  }
  clickedButton(event) {
    let temp = event.srcElement.parentNode;
    for (let i = 0; i < temp.childNodes.length; i++) {
      if (temp.childNodes[i].nodeName === 'BUTTON') {
        if (temp.childNodes[i].classList.contains('active')) {
          temp.childNodes[i].classList.remove('active');
        }
      }
    }
    event.srcElement.classList.add('active')

  }
  showSuccess() {
    this.toastr.success('', 'Order Accepted', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  showError() {
    this.toastr.error('', 'Order Not Accepted', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  restaurantOrder() {
    debugger
    this.restaurantService.RestaurantOrder(this.RestaurantID).subscribe(
      data => {
        this.orderList = data['data'];
        this.orderList.reverse();
        for (let i = 0; i < this.orderList.length; i++) {
          this.orderList[i].TotalAmount = Math.round(this.orderList[i].TotalAmount);
        }
        this.restaurantService.updateOrderDetail(this.orderList);
      },
      err => {
      }
    );
    setTimeout(() => {
      if (this.flag) {
        this.restaurantOrder();
      }
    }, 5000);
  }
  // getOrderID(OrderID: any) {
  //   this.orderID = OrderID;
  // }
  acceptOrder(OrderID: any) {
    this.Orderid = OrderID;

    this.status = true;
    this.restaurantService.RestaurantOrderStatus(OrderID).subscribe(
      data => {
        this.showSuccess();
        this.orderList = data['data'];
        this.ngOnInit();
      },
      err => {
        this.showError();
      }
    );
  }
  viewOrder(OrderID: any) {
    this.Orderid = OrderID;
    localStorage.setItem('OrderID', this.Orderid);
    //this.restaurantService.RestaurantOrderStatus(OrderID);
    this.router.navigate(['/order/order-history-detail']);
  }
  editOrder(orderID: any) {
    this.menuService.updateOrderID(orderID);
    for (let i = 0; i < this.orderList.length; i++) {
      if (orderID == this.orderList[i].OrderID) {
        this.menuService.editOrder(this.orderList[i].MenuOrdered);
        break;
      }
    }
    this.router.navigate(['/pos/edit']);
  }
  countOrders() {
    ++this.countTotalOrders;
    localStorage.setItem("TotalOrders", this.countTotalOrders.toString());
  }
}
