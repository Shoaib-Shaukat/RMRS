import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menu: any;
  staff: any;
  foo: boolean = false;
  orderID: any;
  isStaff: boolean = false;
  menuOrder: any;
  Items: any;
  decide: boolean;
  detailOfStaff: any;
  Permission: any;
  timingsForm: any;
  cancelD: boolean;
  addMenuFormValues: any;
  staffMember: any;
  restaurantFields: any;
  variantsArray: any;
  restaurantInformation: any;
  reservationFields: any;
  POSMenuForm: any;
  restaurantProfile: any;
  discountArray: any;
  deliveryArray: any;
  constructor(private http: HttpClient) {
    this.variantsArray = [];
    this.discountArray = [];
    this.deliveryArray = [];
  }
  updateMenuList(addMenuForm: any) {
    this.menu = addMenuForm;
    this.foo = true;
  }
  preFilledMenu(menuItem: any) {
    this.Items = menuItem;
  }
  decision(abc: boolean) {
    this.decide = abc;
  }
  cancelF(cancel: boolean) {
    this.cancelD = cancel;
  }
  updateStaffList(addStaffForm: any) {
    this.staff = addStaffForm;
    this.foo = true;
  }
  preFilledStaff(eachStaff: any) {

    this.staffMember = eachStaff;
  }
  updateRestaurantList(restaurantAddForm: any) {
    this.restaurantFields = restaurantAddForm;
  }
  preFilledRestaurant(restaurantInfo: any) {
    this.restaurantInformation = restaurantInfo;
  }
  updateReservationList(reservationForm: any) {
    this.reservationFields = reservationForm;
  }
  POSMenu(addMenuForm: any) {
    this.POSMenuForm = addMenuForm;
  }
  addVariantForm(body: any) {
    if (body == "clear") {
      this.variantsArray = [];
    }
    else {
      this.variantsArray.push(body);
    }
  }
  patchFormValue(body: any) {
    this.addMenuFormValues = body;
  }
  editOrder(menuOrder: any) {
    this.menuOrder = menuOrder;
  }
  updateOrderID(body : any){
    this.orderID = body;
  }
  staffDetail(body: any){
    this.detailOfStaff = body;
  }
  addDiscountForm(body: any){
    if (body == "clear") {
      this.discountArray = [];
    }
    else {
      debugger
      this.discountArray.push(body);
    }
  }
  addDeliveryForm(body: any){
    if (body == "clear") {
      this.deliveryArray = [];
    }
    else {
      this.deliveryArray = body;
    }
  }
  setTimingsForm(body: any){
    this.timingsForm = body;
  }
  editRestaurant(body: any){
    this.restaurantProfile = body;
  }
  setStaff(body: any){
    this.Permission = body;
    this.isStaff = true;
  }
}