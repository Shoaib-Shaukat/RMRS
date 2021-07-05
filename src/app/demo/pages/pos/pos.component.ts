import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/shared/services/menu.service';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { CurrencyPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import localFr from '@angular/common/locales/fr'
import { isObject } from 'rxjs/internal-compatibility';
import { IndexedDBService } from 'src/app/shared/services/indexe-db.service';

registerLocaleData(localFr, 'fr');
@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {
  POSForm: FormGroup;
  NameofItemandNameofVariant: any;
  itemInBill: boolean;
  customerAddress: any = "";
  statusOfOrder: any = "";
  salesTax: any;
  subTotal: any;
  editMode: boolean = false;
  itemPriceInItem: any;
  comments: any = "";
  RestaurantId: any;
  ItemId: any;
  deliveryCharges: number = 0;
  VariantId: any;
  Quantity: any;
  description: any;
  NameofVariant: any;
  emptyVariant: any;
  failResponse: boolean = false;
  customerRegistered: boolean = false;
  menuCategoryList: any;
  allitemsList: any;
  RefID: any;
  quantity: any = 0;
  abc: any;
  customerid: any = "";
  descriptionOfItem: any = "";
  nameofItem: any;
  customerName: any = "";
  priceofItem: any;
  OrderID: any;
  RestaurantID: any;
  priceOfItem: any;
  discountPercentage: number = 0;
  paymentMethod: any = "COD";
  OwnerId: any;
  OrderDetail: any;
  VariantsArray: any;
  DetailofOrder: any;
  OrderType: any;
  DetailofOrderDepth: any;
  PaymentMethod: any = 'Cash';
  PaymentSuccessfull: boolean = false;
  Description: any;
  arrayForInfo: any;
  RestaurantName: any;
  QuantityofEachVariant: any;
  TotalAmount: any;
  response: any;
  displayItems: any;
  successResponse: boolean = false;
  searchItemForm: FormGroup;
  MenuOrdered: any;
  CustomerForm: FormGroup;
  error: any;
  NameofItemForDirectAdd: string = "NoItemSelected";
  VariantNametoCompare: any;
  StaffList: any;
  ServiceCharges: any;
  TableList: any;
  displayItemsTwo: any;
  Name: any;
  Price: any;
  a: any = 0;
  VariantName: any;
  discountsArr: any;
  b: any = 0;
  showVariantsOption: boolean = false;
  selected: boolean = false;
  changedItem: boolean = false;
  ListofDeals: any;
  getIndexData: any;
  responseDescription: any;
  orderToEdit: any;
  checkDeal: boolean = false;
  MenuItems: any;
  delivery: any;
  dealArr: any;
  itemArr: any;
  orderConfirming: boolean = false;
  constructor(private currencyPipe: CurrencyPipe, private formBuilder: FormBuilder, private menuService: MenuService, private router: Router, private restaurantService: RestaurantService, private toastr: ToastrService, private indexedDBService: IndexedDBService) {
    this.arrayForInfo = [];
    this.dealArr = [];
    this.itemArr = [];
    this.orderToEdit = [];
    this.salesTax = 0;
    this.subTotal = 0;
    this.displayItems = [];
    this.displayItemsTwo = [];
    this.VariantsArray = [];
    this.MenuOrdered = [];
    this.MenuItems = [];
    this.discountsArr = [];
    this.emptyVariant = { key: 'empty' };
    this.delivery = { key: 'empty' };
  }

  ngOnInit(): void {
    this.RestaurantId = localStorage.getItem("restaurantIdforProfile");
    this.itemInBill = true;
    this.orderConfirming = false;

    this.itemPriceInItem = 0;

    this.DealsList();
    this.forStaffList();
    this.forMenuCategoryList();
    this.forTableList();
    this.forDiscountList();
    this.forServiceCharges();

    this.searchItemForm = this.formBuilder.group({
      RefID: new FormControl('', [
        Validators.required]),
      ItemQuantity: new FormControl('', [
        Validators.required]),
      itemVariantName: new FormControl(null, [])
    }
    );
    this.CustomerForm = this.formBuilder.group({
      CustomerNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(".{10,10}")]),
      orderType: new FormControl('', []),
      discountName: new FormControl('', []),
    }
    );
    this.showVariantsOption = false;
    this.postSync();

  }

  showSuccess() {
    this.toastr.success('', 'Order Added', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  showError() {
    this.toastr.error('', 'Order Not Added!', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  showSuccessForUpdateOrder() {
    this.toastr.success('', 'Order Updated', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  showErrorForUpdateOrder() {
    this.toastr.error('', 'Order Not Updated', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  DealsList() {
    this.restaurantService.getDealsList(this.RestaurantId).subscribe(
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
  forServiceCharges() {
    this.restaurantService.restaurantView(this.RestaurantId).subscribe(
      data => {
        this.ServiceCharges = data['data'].ServicesCharges;
      },
      err => {
      }
    );
  }
  setOrderType(value: any) {
    if (value == 'Dine In') {
      this.OrderType = 'Dine In';
      if (this.ServiceCharges != 0) {
        this.TotalAmount = this.TotalAmount + this.ServiceCharges;
      }
      this.TotalAmount = Math.round(this.TotalAmount);
    }
    else if (value == 'Take Away') {
      this.OrderType = 'Take Away';
    }
    else if (value == 'Online Delivery') {
      this.OrderType = 'Online Delivery';
    }
  }
  forDiscountList() {
    this.restaurantService.restaurantView(this.RestaurantId).subscribe(
      data => {
        this.discountsArr = data['data'].Discounts;
      },
      err => {
      }
    );
  }
  verifyCustomer() {
    this.restaurantService.verifyCustomer('0' + this.CustomerForm.value.CustomerNumber).subscribe(
      data => {
        this.response = true;
        if (data['Message'] == "Success") {
          this.successResponse = true;
          this.failResponse = false;
          this.description = "User is registered";
          this.customerid = data['data'].result.CustomerID;
          this.customerName = data['data'].result.Name;
          this.customerAddress = data['data'].result.Address;
          this.customerRegistered = true;
          //this.customerAddress = data['data'].result.Address;
        }
        else {
          this.failResponse = true;
          this.successResponse = false;
          this.description = "User not registered";
        }
      },
      err => {
      }
    );
  }
  showNameOfItem(refiD: any) {
    this.showVariantsOption = true;
    for (let i = 0; i < this.allitemsList.length; i++) {
      if (refiD == this.allitemsList[i].RefID) {
        this.NameofItemForDirectAdd = this.allitemsList[i].MenuName;
        if (this.allitemsList[i].isVariant == true) {
          this.VariantsArray = (this.allitemsList[i].Variant);
        }
      }
    }
  }
  showDealName(refiD: any) {
    this.showVariantsOption = true;
    for (let i = 0; i < this.ListofDeals.length; i++) {
      if (this.ListofDeals[i].DealID == refiD) {
        this.NameofItemForDirectAdd = this.ListofDeals[i].DealName;
        if (this.ListofDeals[i].Variant.length > 0) {
          this.VariantsArray = (this.ListofDeals[i].Variant);
        }
      }
    }
  }
  addItemDirectly() {
    this.a = 0;
    this.b = 0;
    this.salesTax = 0;
    this.subTotal = 0;
    this.TotalAmount = 0;
    let body = {
      "RefID": this.searchItemForm.value.RefID,
      "Quantity": this.searchItemForm.value.ItemQuantity,
      "VariantName": this.searchItemForm.value.itemVariantName,
    }
    if (body.VariantName == null) {
      for (let i = 0; i < this.allitemsList.length; i++) {
        if (this.allitemsList[i].RefID == body.RefID) {
          this.displayItems[i].Quantity = body.Quantity;
          this.displayItems[i].Price = this.allitemsList[i].CalculatedPrice;
        }
      }
      for (let i = 0; i < this.ListofDeals.length; i++) {
        if (this.ListofDeals[i].DealID == body.RefID) {
          this.displayItemsTwo[i].Quantity = body.Quantity;
          this.displayItemsTwo[i].Price = this.ListofDeals[i].DealPrice;
        }
      }
    }
    else {
      for (let i = 0; i < this.allitemsList.length; i++) {
        for (let j = 0; j < this.displayItems[i].Variant.length; j++) {
          if (this.allitemsList[i].RefID == body.RefID) {
            if (this.allitemsList[i].Variant[j].ItemName == body.VariantName) {
              this.displayItems[i].Variant[j].Quantity = body.Quantity;
              this.displayItems[i].Variant[j].Price = this.allitemsList[i].Variant[j].CalculatedPrice;
            }
          }
        }
      }
    }

    this.VariantsArray = [];
    this.NameofItemForDirectAdd = "NoItemSelected";
    this.searchItemForm.reset();
  }
  selectedVariantPrice(itemIDandVariantID: any) {
    this.selected = true;
    //this.NameofItemandNameofVariant = NameandPriceandVariant.replace(/[0-9]/g, '');
    this.NameofItemandNameofVariant = itemIDandVariantID;
    this.NameofItemandNameofVariant = this.NameofItemandNameofVariant.split("/");
    this.ItemId = this.NameofItemandNameofVariant[0];
    this.VariantId = this.NameofItemandNameofVariant[1];
    this.Price = Math.round(this.NameofItemandNameofVariant[2]);
    //this.Price = NameandPriceandVariant.replace(/\D/g, "");
    // this.Price = Math.round(this.Price);
    for (let i = 0; i < this.allitemsList.length; i++) {
      if (this.allitemsList[i].Variant.length > 0) {
        if (this.allitemsList[i].RefID === this.ItemId) {
          //this.RefID = this.allitemsList[i].RefID;
          this.allitemsList[i].CalculatedPrice = this.Price;
          //this.displayItems[i].OriginalPrice = this.allitemsList[i].CalculatedPrice;
          //this.allitemsList[i].CalculatedPrice = this.allitemsList[i].CalculatedPrice.toLocaleString();
        }
      }

    }
  }


  forMenuCategoryList() {
    debugger
    this.restaurantService.getMenuCategoryList(this.RestaurantId).subscribe(
      async data => {
        await this.indexedDBService.addUser(data['data'], 'CategoryList')
        this.menuCategoryList = await this.indexedDBService.getUser('CategoryList');
        this.restaurantService.updateMenuCategoryList(this.menuCategoryList);
      },
      async err => {
        this.menuCategoryList = await this.indexedDBService.getUser('CategoryList')
      }
    );

  }
  // forItemsList() {
  //   this.restaurantService.getItemsList(this.RestaurantId).subscribe(
  //     data => {
  //       this.allitemsList = data['data'];
  //       for (let i = 0; i < this.allitemsList.length; i++) {
  //         //if (typeof this.allitemsList[i].CalculatedPrice === 'number') {
  //         if (this.allitemsList[i].isVariant == true) {

  //           this.allitemsList[i].CalculatedPrice = this.allitemsList[i].Variant[0].CalculatedPrice;
  //         }
  //         //this.allitemsList[i].CalculatedPrice = Math.round(this.allitemsList[i].CalculatedPrice);
  //         // }
  //       }

  //       this.displayItemlist();
  //       this.displayItemlistTwo();

  //     },
  //     err => {
  //     }
  //   );

  // }

  forItemsList = async () => {
    debugger
    this.getIndexData = await this.indexedDBService.getUser('MenuItems');
    console.log(await this.getIndexData)
    this.allitemsList = await this.getIndexData;
    debugger
    for (let i = 0; i < await this.allitemsList.length; i++) {
      debugger
      if (typeof this.allitemsList[i].CalculatedPrice === 'number') {
        debugger
        if (this.allitemsList[i].isVariant == true) {

          this.allitemsList[i].CalculatedPrice = this.allitemsList[i].Variant[0].CalculatedPrice;
        }
        this.allitemsList[i].CalculatedPrice = Math.round(this.allitemsList[i].CalculatedPrice);
      }
    }

    this.displayItemlist();
    this.displayItemlistTwo();
    await console.log("In forItemsList")
    await console.log(this.getIndexData)
    debugger

  }
  displayItemlist() {
    for (let i = 0; i < this.allitemsList.length; i++) {
      let body = {
        Description: this.allitemsList[i].Description,
        MenuID: this.allitemsList[i].MenuID,
        RefID: this.allitemsList[i].RefID,
        OriginalPrice: this.allitemsList[i].CalculatedPrice,
        NameofItem: this.allitemsList[i].MenuName,
        PriceofItem: 0,
        Quantity: 0,
        Variant: this.allitemsList[i].Variant,
        isVariant: this.allitemsList[i].isVariant
      }
      this.displayItems.push(body);
    }

    for (let i = 0; i < this.displayItems.length; i++) {
      if (this.displayItems[i].isVariant == true) {
        for (let j = 0; j < this.displayItems[i].Variant.length; j++) {
          this.displayItems[i].Variant[j].Quantity = 0;
          this.displayItems[i].Variant[j].Price = 0;
        }
      }
      else {
        this.displayItems[i].Quantity = 0;
        this.displayItems[i].Price = 0;
      }
    }
  }

  minusInVariant(RefID: any, VariantID: any) {
    this.a = 0;
    this.b = 0;
    this.salesTax = 0;
    this.subTotal = 0;
    this.TotalAmount = 0;
    for (let i = 0; i < this.displayItems.length; i++) {
      for (let j = 0; j < this.displayItems[i].Variant.length; j++) {
        if (this.displayItems[i].RefID == RefID) {
          if (this.displayItems[i].Variant[j].VariantID == VariantID) {
            this.displayItems[i].Variant[j].Quantity = this.displayItems[i].Variant[j].Quantity - 1;
          }
        }
      }
    }
  }
  addInVariant(RefID: any, VariantID: any) {
    this.a = 0;
    this.b = 0;
    this.salesTax = 0;
    this.subTotal = 0;
    this.TotalAmount = 0;
    for (let i = 0; i < this.displayItems.length; i++) {
      for (let j = 0; j < this.displayItems[i].Variant.length; j++) {
        if (this.displayItems[i].RefID == RefID) {
          if (this.displayItems[i].Variant[j].VariantID == VariantID) {
            this.displayItems[i].Variant[j].Quantity = this.displayItems[i].Variant[j].Quantity + 1;
          }
        }
      }
    }
  }
  minusQtyItemNoVariant(RefID: any) {
    this.a = 0;
    this.b = 0;
    this.salesTax = 0;
    this.subTotal = 0;
    this.TotalAmount = 0;
    for (let i = 0; i < this.displayItems.length; i++) {
      if (this.displayItems[i].RefID == RefID) {
        this.displayItems[i].Quantity = this.displayItems[i].Quantity - 1;
      }
    }
  }
  addQtyItemNoVariant(RefID: any) {
    this.a = 0;
    this.b = 0;
    this.salesTax = 0;
    this.subTotal = 0;
    this.TotalAmount = 0;
    for (let i = 0; i < this.displayItems.length; i++) {
      if (this.displayItems[i].RefID == RefID) {
        this.displayItems[i].Quantity = this.displayItems[i].Quantity + 1;
      }
    }
  }
  addInCart(RefId: any) {
    this.a = 0;
    this.b = 0;
    this.salesTax = 0;
    this.subTotal = 0;
    this.TotalAmount = 0;
    for (let i = 0; i < this.displayItems.length; i++) {
      if (this.displayItems[i].isVariant == true) {
        if (this.displayItems[i].Variant.length > 0) {
          for (let j = 0; j < this.displayItems[i].Variant.length; j++) {
            if (this.displayItems[i].RefID == RefId) {
              if (this.allitemsList[i].Variant[j].VariantID == this.VariantId) {
                this.displayItems[i].Variant[j].Quantity = this.displayItems[i].Variant[j].Quantity + 1;
                this.displayItems[i].Variant[j].Price = this.Price;
              }
            }
          }
        }
      }
      else {
        if (this.displayItems[i].RefID == RefId) {
          this.displayItems[i].Quantity = this.displayItems[i].Quantity + 1;
          this.displayItems[i].Price = this.Price;
        }
      }
    }
  }

  deleteItem(RefId: any, VarinatId: any) {
    this.a = 0;
    this.b = 0;
    this.salesTax = 0;
    this.subTotal = 0;
    this.TotalAmount = 0;
    for (let i = 0; i < this.displayItems.length; i++) {
      for (let j = 0; j < this.displayItems[i].Variant.length; j++) {
        if (this.displayItems[i].RefID == RefId) {
          if (this.displayItems[i].Variant[j].VariantID == VarinatId) {
            this.displayItems[i].Variant[j].Quantity = 0;
          }
        }
      }
    }
    this.Subtotal();
    this.salestax();

  }
  deleteItemNoVariant(RefId: any) {
    this.a = 0;
    this.b = 0;
    this.salesTax = 0;
    this.subTotal = 0;
    this.TotalAmount = 0;
    for (let i = 0; i < this.displayItems.length; i++) {
      if (this.displayItems[i].RefID == RefId) {
        this.displayItems[i].Quantity = 0;
      }
    }
    this.Subtotal();
    this.salestax();
  }
  forStaffList() {
    this.restaurantService.AllStaff(this.RestaurantId).subscribe(
      data => {
        this.StaffList = data['data'];
      },
      err => {
        this.error = err.error.data.description;
      }
    );
  }
  forTableList() {
    this.restaurantService.getTableList(this.RestaurantId).subscribe(
      data => {
        this.TableList = data['data'].result;
      },
      err => {
      }
    );
  }


  //.............................DEALS........................................
  // displayItemlistTwo() {
  //   this.restaurantService.getDealsList(this.RestaurantId).subscribe(
  //     data => {
  //       this.ListofDeals = data['data'];
  //       for (let i = 0; i < this.ListofDeals.length; i++) {
  //         let body = {
  //           Description: this.ListofDeals[i].Description,
  //           DealID: this.ListofDeals[i].DealID,
  //           DealName: this.ListofDeals[i].DealName,
  //           DealPrice: this.ListofDeals[i].DealPrice,
  //           MenuItems: this.ListofDeals[i].MenuItems,
  //           Variant: this.ListofDeals[i].Variant,
  //           isVariant: this.ListofDeals[i].isVariant,
  //         }
  //         this.displayItemsTwo.push(body);
  //       }
  //       for (let i = 0; i < this.displayItemsTwo.length; i++) {
  //         this.displayItemsTwo[i].Quantity = 0;
  //       }
  //       if (this.menuService.menuOrder != undefined) {
  //         this.editOrder();
  //       }
  //     },
  //     err => {
  //     }
  //   );
  // }
  displayItemlistTwo() {
    this.restaurantService.getDealsList(this.RestaurantId).subscribe(
      async data => {
        await this.indexedDBService.addUser(data['data'], 'DealsList')
        this.ListofDeals = await this.indexedDBService.getUser('DealsList');
        for (let i = 0; i < this.ListofDeals.length; i++) {
          let body = {
            Description: this.ListofDeals[i].Description,
            DealID: this.ListofDeals[i].DealID,
            DealName: this.ListofDeals[i].DealName,
            DealPrice: this.ListofDeals[i].DealPrice,
            MenuItems: this.ListofDeals[i].MenuItems,
            Variant: this.ListofDeals[i].Variant,
            isVariant: this.ListofDeals[i].isVariant,
          }
          this.displayItemsTwo.push(body);
        }
        for (let i = 0; i < this.displayItemsTwo.length; i++) {
          this.displayItemsTwo[i].Quantity = 0;
        }
        if (this.menuService.menuOrder != undefined) {
          this.editOrder();
        }
      },
      async err => {
        this.ListofDeals = await this.indexedDBService.getUser('DealsList');
      }
    );
  }
  addDeal(DealId: any) {
    this.a = 0;
    this.b = 0;
    this.salesTax = 0;
    this.subTotal = 0;
    this.TotalAmount = 0;
    for (let i = 0; i < this.displayItemsTwo.length; i++) {
      if (this.displayItemsTwo[i].DealID == DealId) {
        this.displayItemsTwo[i].Quantity = this.displayItemsTwo[i].Quantity + 1;
      }
    }
  }
  addInDeal(DealId: any) {
    this.a = 0;
    this.b = 0;
    this.salesTax = 0;
    this.subTotal = 0;
    this.TotalAmount = 0;
    for (let i = 0; i < this.displayItemsTwo.length; i++) {
      if (this.displayItemsTwo[i].DealID == DealId) {
        this.displayItemsTwo[i].Quantity = this.displayItemsTwo[i].Quantity + 1;
      }
    }
  }
  minusInDeal(DealId: any) {
    this.a = 0;
    this.b = 0;
    this.salesTax = 0;
    this.subTotal = 0;
    this.TotalAmount = 0;
    for (let i = 0; i < this.displayItemsTwo.length; i++) {
      if (this.displayItemsTwo[i].DealID == DealId) {
        this.displayItemsTwo[i].Quantity = this.displayItemsTwo[i].Quantity - 1;
      }
    }
  }

  deleteDeal(DealId: any) {
    this.a = 0;
    this.b = 0;
    this.salesTax = 0;
    this.subTotal = 0;
    this.TotalAmount = 0;
    for (let i = 0; i < this.displayItemsTwo.length; i++) {
      if (this.displayItemsTwo[i].DealID == DealId) {
        this.displayItemsTwo[i].Quantity = 0;
      }
    }
    this.Subtotal();
    this.salestax();

  }
  //...............................Edit Order...........................................
  editOrder() {
    this.editMode = true;
    this.orderToEdit = this.menuService.menuOrder;
    for (let i = 0; i < this.orderToEdit.length; i++) {
      if (this.orderToEdit[i].Deal) {
        this.dealArr.push(this.orderToEdit[i]);
      }
      else {
        this.itemArr.push(this.orderToEdit[i]);
      }
    }
    for (let i = 0; i < this.itemArr.length; i++) {
      for (let j = 0; j < this.displayItems.length; j++) {
        if (this.displayItems[j].MenuID == this.itemArr[i].MenuID) {
          if (this.itemArr[i].isVariant == false) {
            this.displayItems[j].Quantity = this.itemArr[i].Quantity;
          }
          else {
            for (let k = 0; k < this.displayItems[j].Variant.length; k++) {
              if (this.displayItems[j].Variant[k].VariantID == this.itemArr[i].Variant.VariantID) {
                this.displayItems[j].Variant[k].Quantity = this.itemArr[i].Variant.Quantity;
              }
            }
          }
        }
      }
    }

    for (let i = 0; i < this.dealArr.length; i++) {
      for (let j = 0; j < this.displayItemsTwo.length; j++) {
        if (this.displayItemsTwo[j].DealID == this.dealArr[i].DealID) {
          this.displayItemsTwo[j].Quantity = this.dealArr[i].Quantity;
        }
      }
    }
    this.Subtotal();
    this.salestax();
  }
  //............................Calculation...................................

  Subtotal() {
    for (let i = 0; i < this.displayItems.length; i++) {
      if (this.displayItems[i].isVariant == true) {
        for (let j = 0; j < this.displayItems[i].Variant.length; j++) {
          this.a = (this.a + (+this.displayItems[i].Variant[j].Price) * (+this.displayItems[i].Variant[j].Quantity));
        }
      }
      else {
        this.a = (this.a + (+this.displayItems[i].OriginalPrice) * (+this.displayItems[i].Quantity));
      }
    }
    for (let i = 0; i < this.displayItemsTwo.length; i++) {
      this.a = (this.a + (+this.displayItemsTwo[i].DealPrice) * (+this.displayItemsTwo[i].Quantity));
    }
    this.subTotal = this.a;
    this.subTotal = Math.round(this.subTotal);
    this.TotalAmount = (+this.salesTax) + (+this.subTotal);
    this.TotalAmount = Math.round(this.TotalAmount);
  }
  salestax() {
    for (let i = 0; i < this.displayItems.length; i++) {
      this.b = (+this.a * 0.075);
    }
    for (let i = 0; i < this.displayItemsTwo.length; i++) {
      this.b = (+this.a * 0.075);
    }
    this.salesTax = this.b;
    this.salesTax = Math.round(this.salesTax);
    this.TotalAmount = (+this.salesTax) + (+this.subTotal);
    this.TotalAmount = Math.round(this.TotalAmount);

    for (let i = 0; i < this.discountsArr.length; i++) {
      if (this.CustomerForm.controls['discountName'].value == this.discountsArr[i].DiscountName) {
        this.discountPercentage = this.discountsArr[i].DiscountPercentage;
      }
    }
    this.TotalAmount = this.TotalAmount - ((this.TotalAmount / 100) * this.discountPercentage);
    this.TotalAmount = Math.round(this.TotalAmount);
  }

  //.............................Print......................................

  updateOrder() {
    this.orderConfirming = true;
    for (let i = 0; i < this.displayItems.length; i++) {
      if (this.displayItems[i].isVariant == false) {
        if (this.displayItems[i].Quantity > 0) {
          let body = {
            Description: this.displayItems[i].Description,
            MenuID: this.displayItems[i].MenuID,
            MenuPrice: this.displayItems[i].OriginalPrice,
            MenuName: this.displayItems[i].NameofItem,
            PriceofItem: 0,
            Quantity: this.displayItems[i].Quantity,
            Variant: this.emptyVariant,
            isVariant: this.displayItems[i].isVariant,
          }
          this.MenuOrdered.push(body);
        }
      }
      else {
        for (let j = 0; j < this.displayItems[i].Variant.length; j++) {
          if (this.displayItems[i].Variant[j].Quantity > 0) {
            let body = {
              Description: this.displayItems[i].Description,
              MenuID: this.displayItems[i].MenuID,
              MenuPrice: this.displayItems[i].OriginalPrice,
              MenuName: this.displayItems[i].NameofItem,
              PriceofItem: 0,
              Quantity: this.displayItems[i].Variant[j].Quantity,
              Variant: this.displayItems[i].Variant[j],
              isVariant: this.displayItems[i].isVariant
            }
            this.MenuOrdered.push(body);
          }
        }
      }
    }
    for (let i = 0; i < this.displayItemsTwo.length; i++) {
      if (this.displayItemsTwo[i].Quantity > 0) {
        let body = {
          DealID: this.displayItemsTwo[i].DealID,
          Description: this.displayItemsTwo[i].Description,
          MenuName: this.displayItemsTwo[i].DealName,
          MenuPrice: this.displayItemsTwo[i].DealPrice,
          Quantity: this.displayItemsTwo[i].Quantity,
          MenuItems: this.displayItemsTwo[i].MenuItems,
          Variant: this.emptyVariant,
          isVariant: this.displayItemsTwo[i].isVariant,
          Deal: true
        }
        this.MenuOrdered.push(body);
      }
    }
    this.OrderID = this.menuService.orderID;
    this.RestaurantID = localStorage.getItem("restaurantIdforProfile");
    this.RestaurantName = localStorage.getItem("restaurantName");
    this.OwnerId = localStorage.getItem("OwnerID");
    let body = {
      OrderID: this.OrderID,
      RestaurantID: this.RestaurantID,
      RestaurantName: this.RestaurantName,
      MenuOrdered: this.MenuOrdered,
      CustomerRegistered: this.customerRegistered,
      CustomerID: this.customerid,
      TotalAmount: this.TotalAmount,
      SalesTax: this.salesTax,
      OwnerID: this.OwnerId,
      SubTotal: this.subTotal,
      CustomerName: this.customerName,
      CustomerAddress: this.customerAddress,
      OrderType: this.OrderType,
      Comments: this.comments,
      Delivery: this.delivery,
      DeliveryCharges: this.deliveryCharges,
      PaymentMethod: this.paymentMethod
    }
    this.restaurantService.updateOrder(body).subscribe(
      data => {
        this.menuService.editOrder(undefined);
        this.showSuccessForUpdateOrder();
        this.PaymentSuccessfull = true;
        //this.Description = data['data'].description;
        this.a = 0;
        this.b = 0;
        this.salesTax = 0;
        this.subTotal = 0;
        this.TotalAmount = 0;
        this.CustomerForm.reset();
        this.response = false;
        this.displayItems = [];
        this.displayItemsTwo = [];
        this.dealArr = [];
        this.itemArr = [];
        this.orderToEdit = [];
        this.editMode = false;
        this.router.navigate(['/order/order-list']);
      },
      err => {
        this.showErrorForUpdateOrder();
      }
    );
  }
  print() {
    this.orderConfirming = true;
    for (let i = 0; i < this.displayItems.length; i++) {
      if (this.displayItems[i].isVariant == false) {
        if (this.displayItems[i].Quantity > 0) {
          let body = {
            Description: this.displayItems[i].Description,
            MenuID: this.displayItems[i].MenuID,
            MenuPrice: this.displayItems[i].OriginalPrice,
            MenuName: this.displayItems[i].NameofItem,
            PriceofItem: 0,
            Quantity: this.displayItems[i].Quantity,
            Variant: this.emptyVariant,
            isVariant: this.displayItems[i].isVariant,
          }
          this.MenuOrdered.push(body);
        }
      }
      else {
        for (let j = 0; j < this.displayItems[i].Variant.length; j++) {
          if (this.displayItems[i].Variant[j].Quantity > 0) {
            let body = {
              Description: this.displayItems[i].Description,
              MenuID: this.displayItems[i].MenuID,
              MenuPrice: this.displayItems[i].OriginalPrice,
              MenuName: this.displayItems[i].NameofItem,
              PriceofItem: 0,
              Quantity: this.displayItems[i].Variant[j].Quantity,
              Variant: this.displayItems[i].Variant[j],
              isVariant: this.displayItems[i].isVariant
            }
            this.MenuOrdered.push(body);
          }
        }
      }
    }
    for (let i = 0; i < this.displayItemsTwo.length; i++) {
      if (this.displayItemsTwo[i].Quantity > 0) {
        let body = {
          DealID: this.displayItemsTwo[i].DealID,
          Description: this.displayItemsTwo[i].Description,
          MenuName: this.displayItemsTwo[i].DealName,
          MenuPrice: this.displayItemsTwo[i].DealPrice,
          Quantity: this.displayItemsTwo[i].Quantity,
          MenuItems: this.displayItemsTwo[i].MenuItems,
          Variant: this.emptyVariant,
          isVariant: this.displayItemsTwo[i].isVariant,
          Deal: true
        }
        this.MenuOrdered.push(body);
      }
    }
    this.OrderID = localStorage.getItem('OrderID');
    this.RestaurantID = localStorage.getItem("restaurantIdforProfile");
    this.RestaurantName = localStorage.getItem("restaurantName");
    this.OwnerId = localStorage.getItem("OwnerID");
    let body = {
      RestaurantID: this.RestaurantID,
      RestaurantName: this.RestaurantName,
      MenuOrdered: this.MenuOrdered,
      CustomerRegistered: this.customerRegistered,
      CustomerID: this.customerid,
      TotalAmount: this.TotalAmount,
      SalesTax: this.salesTax,
      OwnerID: this.OwnerId,
      SubTotal: this.subTotal,
      CustomerName: this.customerName,
      CustomerAddress: this.customerAddress,
      OrderType: this.OrderType,
      Comments: this.comments,
      Delivery: this.delivery,
      DeliveryCharges: this.deliveryCharges,
      PaymentMethod: this.paymentMethod
    }
    this.restaurantService.RestaurantRecipt(body).subscribe(
      data => {
        this.showSuccess();
        this.PaymentSuccessfull = true;
        this.Description = data['data'].description;
        this.a = 0;
        this.b = 0;
        this.salesTax = 0;
        this.subTotal = 0;
        this.TotalAmount = 0;
        this.displayItems = [];
        this.displayItemsTwo = [];
        this.CustomerForm.reset();
        this.response = false;
        this.ngOnInit();

      },
      err => {
        this.showError();
      }
    );
  }
  postSync() {
    //api call
    this.restaurantService.getItemsList(this.RestaurantId).subscribe(
      async (res) => {
        await this.indexedDBService.addUser(res['data'], 'MenuItems')
        await this.forItemsList();
      },
      async (err) => {
        await this.forItemsList();
        this.backgroundSync();
      }
    );
  }

  backgroundSync() {
    navigator.serviceWorker.ready
      .then((swRegistration) => swRegistration.sync.register('post-data'))
      .catch(console.log);
  }
}