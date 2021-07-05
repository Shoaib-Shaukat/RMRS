import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'
@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  content = new BehaviorSubject(false);
  sendFlagFurhter = this.content.asObservable();

  categoryname: any;
  ownerID: any;
  restaurantID: any;
  Email: any;
  PhoneNo: any;
  signUpForm: any;
  preFilled: any;
  RestaurantDetail: any;
  StaffID: any;
  RestaurantListinAddStaff: any;
  addStaffForm: any;
  RestaurantIDS: any;
  RestaurantEdit: any;
  RestrictionValue: any;
  RestaurantIdForStaff: any;
  menucategorylistinitem: any;
  categoryid: any;
  Mode: any;
  StaffEdit: any;
  orderdetail: any;
  RestID: any;
  OwnerID: any;
  variantsArray: any;
  constructor(private http: HttpClient) {
    this.variantsArray = [];
  }


  // test
  sendFlag(getFlag): void {

    this.content.next(getFlag);
  }

  //---------------------------------Owner----------------------------------------
  verifyEmail(body: any): Observable<any> {

    this.Email = body.Email;
    return this.http.post(environment.apiUrl + '/owner/verify-email', body);
  }

  sendOTP(body: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/owner/send-otp', body);
  }
  updateOwnerID(OwnerID: any) {
    this.ownerID = OwnerID;

  }
  signUp(body: any) {

    return this.http.post(environment.apiUrl + '/owner/signup', body);
  }
  //------------------------------ Restaurant ------------------------------------
  updateRestaurantID(RestaurantID: any) {
    this.restaurantID = RestaurantID;

  }
  EditRestaurant(editRestaurant: any) {
    this.RestaurantEdit = editRestaurant;
  }
  addRestaurant(body: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/restaurant/new-profile', body);
  }
  updateRestaurant(body: any, resID: any){
    return this.http.put(environment.apiUrl + '/restaurant/update/?RestaurantID='+resID, body);
  }
  updateRestaurantList(body: any) {
    this.signUpForm = body;
  }
  preFilledRestaurantEdit(body: any) {
    this.preFilled = body;

  }
  AllRestaurants(body: any) {
    return this.http.get(environment.apiUrl + '/restaurant/all-restaurants/?ownerID=' + body);
  }
  restaurantView(body: any) {
    return this.http.get(environment.apiUrl + '/restaurant/detail/?restaurantID=' + body);
  }
  //------------------------------- Staff  --------------------------------------
  addStaff(body: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/staff', body);
  }
  updateStaffID(StaffID: any) {

    this.StaffID = StaffID;

  }
  addRestaurantListinStaff(body: any) {
    this.RestaurantListinAddStaff = body;
  }
  updateStaffList(body: any) {
    this.addStaffForm = body;
  }

  AllStaff(body: any) {

    return this.http.get(environment.apiUrl + '/staff/?restaurantid=' + body);
  }
  RestuarantIDForStaffList(body: any) {
    this.RestaurantIdForStaff = body;
  }
  EditStaff(editStaff: any) {
    this.StaffEdit = editStaff;
  }
  //------------------------------- Category  --------------------------------------

  getCategoryName() {

    return this.http.get(environment.apiUrl + '/restaurant/category');
  }
  addCategory(body: any) {

    return this.http.post(environment.apiUrl + '/restaurant/category', body);
  }


  restrictionValue(body: any) {
    this.RestrictionValue = body;
  }

  //-------------------------------------- Menu  --------------------------------------
  getMenuCategoryList(body: any) {
    return this.http.get(environment.apiUrl + '/menu/category-list/?restaurantid=' + body);
  }
  addMenuItem(body: any) {
    return this.http.post(environment.apiUrl + '/menu', body);
  }
  updateMenuItem(body: any) {
    return this.http.put(environment.apiUrl + '/menu', body);
  }
  addMenuCategory(body: any) {
    return this.http.post(environment.apiUrl + '/menu/category', body);
  }
  updateMenuCategoryList(body: any) {
    this.menucategorylistinitem = body;
  }
  getItemsList(body: any) {
    return this.http.get(environment.apiUrl + '/menu?restaurantID=' + body);
  }
  updateCategoryNameforitemslist(body: any) {
    this.categoryname = body;
  }
  updateCategoryid(body: any) {
    this.categoryid = body;
  }
  deleteMenu(menuID: any) {
    return this.http.delete(environment.apiUrl + '/menu/?menuID=' + menuID);
  }
  //-----------------------------------------------------------------------------------------

  editornot(body: any) {
    this.Mode = body;
  }
  //------------------------------------- Order ---------------------------------------------
  RestaurantOrder(body: any) {
    return this.http.get(environment.apiUrl + '/restaurant/order/?restaurantID=' + body);
  }
  RestaurantOrderStatus(body: any) {
    return this.http.get(environment.apiUrl + '/restaurant/order-status/?orderid=' + body);
  }
  updateOrderDetail(body: any) {
    this.orderdetail = body;
  }
  PrintRecipt(body: any) {
    return this.http.post(environment.apiUrl + '/restaurant/Invoice', body);
  }
  RestaurantOrderDetail(body: any) {

    this.OwnerID = body;
    this.OwnerID = this.OwnerID.slice(0, 10);
    this.RestID = body;
    this.RestID = this.RestID.slice(10, 20);
    return this.http.get(environment.apiUrl + '/restaurant/order-detail/?orderID=' + this.OwnerID + '&restaurantID=' + this.RestID);
  }
  // Notification 
  GetRestaurantNotification(body: any) {
    return this.http.get(environment.apiUrl + '/notification/restaurant/?RestaurantID=' + body);
  }
  GetOwnerNotification(body: any) {
    return this.http.get(environment.apiUrl + '/notification/owner/?OwnerID=' + body);
  }

  postFile(fileToUpload: File) {
    const endpoint = 'https://fileupload.teletaleem.com/restaurant/upload';
    const formData: FormData = new FormData();
    formData.append('fileData', fileToUpload, fileToUpload.name);
    //formData.append('ImageCaption', caption);
    return this.http
      .post(endpoint, formData);
  }
  RestaurantRecipt(body: any) {
    return this.http.post(environment.apiUrl + '/restaurant/order', body);
  }
  updateOrder(body: any) {
    return this.http.put(environment.apiUrl + '/restaurant/order-update', body);
  }
  //------------------------------------- Reservation ---------------------------------------------
  addReservation(body: any) {
    return this.http.post(environment.apiUrl + '/reservation/?RestaurantID=', body);
  }
  ReservationList(body: any) {
    return this.http.get(environment.apiUrl + '/reservation/?RestaurantID=' + body);
  }
  acceptReservationForCustomer(body: any) {
    return this.http.put(environment.apiUrl + '/reservation/?RestaurantID=', body);
  }
  rejectReservation(body: any) {
    return this.http.delete(environment.apiUrl + '/reservation/?ReservationID=' + body);
  }
  //------------------------------------- Table ---------------------------------------------
  getTableList(body: any) {
    return this.http.get(environment.apiUrl + '/table/?RestaurantID=' + body);
  }
  addVariantForm(body: any) {
    this.variantsArray.push(body);
  }
  //------------------------------------- Verify Customer ---------------------------------------------
  verifyCustomer(body) {
    return this.http.get(environment.apiUrl + '/customer/?MobileNumber=' + body);
  }
  //------------------------------------- Deals ---------------------------------------------
  addDeal(body: any) {
    return this.http.post(environment.apiUrl + '/deals', body);
  }
  deleteDeal(body: any){
    return this.http.delete(environment.apiUrl + '/deals/?DealID=' + body);
  }
  deleteAllDeals(body: any){
    return this.http.delete(environment.apiUrl + '/deals/deleteAll/?RestaurantID=' + body);
  }
  getDealsList(body: any) {
    return this.http.get(environment.apiUrl + '/deals/?RestaurantID=' + body);
  }
  dealsPostFile(fileToUpload: File) {
    const endpoint = 'https://fileupload.teletaleem.com/deal/upload';
    const formData: FormData = new FormData();
    formData.append('fileData', fileToUpload, fileToUpload.name);
    //formData.append('ImageCaption', caption);
    return this.http
      .post(endpoint, formData);
  }
  //------------------------------------- Sales Report ---------------------------------------------
  searchReports(body: any) {
    return this.http.get(environment.apiUrl + '/report/?RestaurantID=' + body.RestaurantID +
      '&StartDate=' + body.StartDate + '&EndDate=' + body.EndDate + '&isToday=' + body.isToday);
  }
}

