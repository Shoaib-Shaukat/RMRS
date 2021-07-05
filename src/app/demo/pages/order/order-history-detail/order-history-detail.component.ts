import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { Location } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import localFr from '@angular/common/locales/fr'
registerLocaleData(localFr, 'fr');
@Component({
  selector: 'app-order-history-detail',
  templateUrl: './order-history-detail.component.html',
  styleUrls: ['./order-history-detail.component.scss']
})
export class OrderHistoryDetailComponent implements OnInit {
  OrderDetail: any;
  OrderID: any;
  DetailofOrder: any;
  PaymentMethod: any = 'Cash';
  Description: any;
  RestaurantID: any;
  PaymentSuccessfull: boolean = false;
  DetailofOrderDepth: any;
  SalesTax: any;
  SubTotal: any;
  orderPaymentMade: boolean = false;
  orderPrintInvoice: boolean = false;
  Permission: any;
  TotalAmount: any;
  MenuOrdered: any;
  itemsList: any;
  dealsList: any;
  constructor(private router: Router, private restaurantService: RestaurantService, private _location: Location, private toastr: ToastrService) {
    this.itemsList = [];
    this.dealsList = [];
  }

  ngOnInit(): void {
    this.OrderID = localStorage.getItem('OrderID');
    this.DetailOfOrder();
    this.setPermission();
  }
  setPermission() {
    if (localStorage.getItem("isStaff") == "true") {
      this.Permission = JSON.parse(localStorage.getItem("permissionArr"));
      for (let i = 0; i < this.Permission.length; i++) {
        if (this.Permission[i] == 'Order-PaymentMade') {
          this.orderPaymentMade = true;
        }
        else if (this.Permission[i] == 'Order-PrintInvoice') {
          this.orderPrintInvoice = true;
        }
      }
    }
  }
  showSuccess() {
    this.toastr.success('', 'PAYMENT MADE', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  showError() {
    this.toastr.error('', 'PAYMENT NOT MADE', {
      timeOut: 3000,
      'progressBar': true,
    });
  }

  DetailOfOrder() {
    this.OrderID = localStorage.getItem('OrderID');
    this.RestaurantID = localStorage.getItem("restaurantIdforProfile");
    this.OrderDetail = this.restaurantService.RestaurantOrderDetail(this.OrderID + this.RestaurantID).subscribe(
      data => {
        this.DetailofOrder = data['data'];
        this.DetailofOrder[0].SalesTax = Math.round(this.DetailofOrder[0].SalesTax);
        this.DetailofOrder[0].SubTotal = Math.round(this.DetailofOrder[0].SubTotal);
        this.DetailofOrder[0].TotalAmount = Math.round(this.DetailofOrder[0].TotalAmount);
        this.MenuOrdered = this.DetailofOrder[0].MenuOrdered;

        for (let i = 0; i < this.MenuOrdered.length; i++) {
          if (this.MenuOrdered[i].Variant) {
            this.itemsList.push(this.MenuOrdered[i]);
          }
          if (this.MenuOrdered[i].MenuItems) {
            this.dealsList.push(this.MenuOrdered[i]);
          }
        }
        // this.SalesTax = this.DetailofOrder['0'].SalesTax;
        // this.SalesTax = this.SalesTax.toLocaleString();
        // this.SubTotal = this.DetailofOrder['0'].SubTotal;
        // this.SubTotal = this.SubTotal.toLocaleString();
        // this.TotalAmount = this.DetailofOrder['0'].TotalAmount;
        // this.TotalAmount = this.TotalAmount.toLocaleString();
        // this.DetailofOrderDepth = this.DetailofOrder['0'].MenuOrdered;
        // console.log(data['data']);
      },

      err => {
      }
    );
  }
  print() {
    let body = {
      OrderID: this.OrderID,
      PaymentMethod: this.PaymentMethod
    }
    this.restaurantService.PrintRecipt(body).subscribe(
      data => {
        this.showSuccess();
        this.PaymentSuccessfull = true;
        this.Description = data['data'].description;
        this.router.navigate(['/order/order-list']);
      },
      err => {
      }
    );
  }
  canceled() {
    this.ngOnInit();
    this.router.navigate(['/order/order-list']);
  }
  backClicked() {
    this.ngOnInit();
    this._location.back();
  }
}
