import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'src/app/shared/services/menu.service';
import { FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-restaurant-add',
  templateUrl: './restaurant-add.component.html',
  styleUrls: ['./restaurant-add.component.scss'],
  providers: [RestaurantService]
})
export class RestaurantAddComponent implements OnInit {
  param1: string;
  param2: string;
  restaurantAddForm: FormGroup;
  addDiscountForm: FormGroup;
  addDeliveryForm: FormGroup;
  setTimingForm: FormGroup
  fileToUpload: File = null;
  cancel: boolean;
  ADDorEDIT: boolean;//add or edit restaurant mode
  ownerID: any;
  restaurantID: any;
  editMode: boolean = false;
  error: any;
  loading: boolean;
  Restaurant: any;
  RestaurantID: any;
  RestaurantName: any;
  Address: any;
  OwnerId: any;
  NTNNumber: any;
  ResCategoryName: any;
  restaurantProfile: any;
  TotalDevices: any;
  RestaurantVerified: any;
  RestaurantType: any;
  RestaurantId: any;
  CategoryList: any;
  discountsArr: any;
  restaurantVerified: any;
  boo: boolean = false;
  Delivery: any;
  Discounts: any;
  DisplayMessage: boolean = false;
  ResCategoryId: any;
  Categoryid: any;
  restaurantCategory: any;
  Timings: any;
  Mode: boolean = false;
  Restaurantcategory: any;
  deliveryArr: any;
  public href: string = "";
  countOfRestaurant: number = 0;
  item: any;
  imageUrl: string;
  //fileToUpload: File = null;
  //Image: string;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private menuService: MenuService,
    private router: Router,
    private restaurantService: RestaurantService,
    private authService: AuthService, private toastr: ToastrService) {
    this.discountsArr = [];
    this.deliveryArr = [];
  }

  ngOnInit(): void {
    this.reactiveForms();
    this.clearFields();
    this.OwnerId = localStorage.getItem("OwnerID");
    // this.restaurantService.updateRestaurantList(this.restaurantAddForm);
    // this.restaurantService.preFilledRestaurantEdit(this.restaurantAddForm);
    // this.menuService.updateRestaurantList(this.restaurantAddForm);
    //this.ownerID = this.restaurantService.ownerID;
    this.ADDorEDIT = this.menuService.decide;
    this.Mode = this.restaurantService.Mode;
    this.getCategory();
    if (this.Mode) {
      this.restaurantAddForm.controls['RestaurantName'].patchValue(this.restaurantService.RestaurantEdit.RestaurantName);
      this.restaurantAddForm.controls['Address'].patchValue(this.restaurantService.RestaurantEdit.Address);
      this.restaurantAddForm.controls['NTN'].patchValue(this.restaurantService.RestaurantEdit.NTNNumber);
      this.restaurantAddForm.controls['RestaurantCategoryInfo'].patchValue(this.ResCategoryName);
      this.restaurantAddForm.controls['RestaurantVerified'].patchValue(this.restaurantService.RestaurantEdit.RestaurantVerified);
      //  this.restaurantAddForm.controls['TotalDevices'].patchValue(this.restaurantService.RestaurantEdit.TotalDevices);

    }
    this.Mode = false;
    this.restaurantService.editornot(this.Mode);
    this.editRestaurant();
  }
  reactiveForms() {
    this.restaurantAddForm = this.formBuilder.group({
      RestaurantName: new FormControl('', [
        Validators.required]),
      Address: new FormControl('', [
        Validators.required,]),
      NTN: new FormControl('', [
        Validators.required,
        Validators.pattern(".{9,9}")]),
      ServiceCharges: new FormControl('', []),
      RestaurantCategoryInfo: new FormControl('', [
        Validators.required,]),
      RestaurantVerified: new FormControl('False', [
        Validators.required,]),
      AttachImage: new FormControl('', [Validators.required])
    }
    );

    this.addDiscountForm = this.formBuilder.group({
      DiscountName: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Za-z].{2,}")]),
      DiscountPercentage: new FormControl('', [
        Validators.required]),
    }
    );

    this.addDeliveryForm = this.formBuilder.group({
      DeliveryTime: new FormControl('', [
        Validators.required]),
      DeliveryCharges: new FormControl('', [
        Validators.required]),
    }
    );

    this.setTimingForm = this.formBuilder.group({
      MondayStartTime: new FormControl('', [
        Validators.required]),
      MondayEndTime: new FormControl('', [
        Validators.required]),
      TuesdayStartTime: new FormControl('', [
        Validators.required]),
      TuesdayEndTime: new FormControl('', [
        Validators.required]),
      WednesdayStartTime: new FormControl('', [
        Validators.required]),
      WednesdayEndTime: new FormControl('', [
        Validators.required]),
      ThursdayStartTime: new FormControl('', [
        Validators.required]),
      ThursdayEndTime: new FormControl('', [
        Validators.required]),
      FridayStartTime: new FormControl('', [
        Validators.required]),
      FridayEndTime: new FormControl('', [
        Validators.required]),
      SaturdayStartTime: new FormControl('', [
        Validators.required]),
      SaturdayEndTime: new FormControl('', [
        Validators.required]),
      SundayStartTime: new FormControl('', [
        Validators.required]),
      SundayEndTime: new FormControl('', [
        Validators.required]),
    }
    );
  }
  editRestaurant() {
    if (this.menuService.restaurantProfile != undefined) {
      this.editMode = true;
      this.restaurantProfile = this.menuService.restaurantProfile;
      this.restaurantAddForm.patchValue({
        RestaurantName: this.menuService.restaurantProfile.RestaurantName,
        Address: this.menuService.restaurantProfile.Address,
        NTN: this.menuService.restaurantProfile.NTNNumber,
        ServiceCharges: this.menuService.restaurantProfile.ServicesCharges,
        RestaurantCategoryInfo: this.menuService.restaurantProfile.RestaurantCategory,
        RestaurantVerified: this.menuService.restaurantProfile.RestaurantVerified,
      });

      this.restaurantCategory = this.menuService.restaurantProfile.RestaurantCategory;
      this.restaurantVerified = this.menuService.restaurantProfile.RestaurantVerified;

      this.Delivery = this.menuService.restaurantProfile.Delivery[0];
      this.menuService.addDeliveryForm(this.Delivery);
      this.deliveryArr = this.menuService.deliveryArray;
      debugger
      this.Discounts = this.menuService.restaurantProfile.Discounts;
      for (let i = 0; i < this.Discounts.length; i++) {
        this.menuService.addDiscountForm(this.Discounts[i]);
      }
      this.discountsArr = this.menuService.discountArray;
      debugger
      this.menuService.setTimingsForm(this.menuService.restaurantProfile.Timings);
      this.Timings = this.menuService.timingsForm;
      this.setTimingForm.patchValue({
        MondayStartTime: this.menuService.restaurantProfile.Timings[0].StartTime,
        MondayEndTime: this.menuService.restaurantProfile.Timings[0].EndTime,
        TuesdayStartTime: this.menuService.restaurantProfile.Timings[1].StartTime,
        TuesdayEndTime: this.menuService.restaurantProfile.Timings[1].EndTime,
        WednesdayStartTime: this.menuService.restaurantProfile.Timings[2].StartTime,
        WednesdayEndTime: this.menuService.restaurantProfile.Timings[2].EndTime,
        ThursdayStartTime: this.menuService.restaurantProfile.Timings[3].StartTime,
        ThursdayEndTime: this.menuService.restaurantProfile.Timings[3].EndTime,
        FridayStartTime: this.menuService.restaurantProfile.Timings[4].StartTime,
        FridayEndTime: this.menuService.restaurantProfile.Timings[4].EndTime,
        SaturdayStartTime: this.menuService.restaurantProfile.Timings[5].StartTime,
        SaturdayEndTime: this.menuService.restaurantProfile.Timings[5].EndTime,
        SundayStartTime: this.menuService.restaurantProfile.Timings[6].StartTime,
        SundayEndTime: this.menuService.restaurantProfile.Timings[6].EndTime,
      });
    }
    else {
      this.clearFields();
    }
  }
  addDiscountFormFunc() {
    //this.replaced = false;
    let body = {
      DiscountName: this.addDiscountForm.controls['DiscountName'].value,
      DiscountPercentage: this.addDiscountForm.controls['DiscountPercentage'].value,
    }
    this.menuService.addDiscountForm(body);
    this.discountsArr = this.menuService.discountArray;
    this.addDiscountForm.reset();
  }
  addDeliveryFormFunc() {
    let body = {
      DeliveryTime: this.addDeliveryForm.controls['DeliveryTime'].value,
      DeliveryCharges: this.addDeliveryForm.controls['DeliveryCharges'].value,
    }
    this.menuService.addDeliveryForm(body);
    this.deliveryArr = this.menuService.deliveryArray;
    this.addDeliveryForm.reset();
  }
  setTimingsFunc() {

    let body = [
      {
        Day: "Monday",
        StartTime: this.setTimingForm.controls['MondayStartTime'].value,
        EndTime: this.setTimingForm.controls['MondayEndTime'].value
      },
      {
        Day: "Tuesday",
        StartTime: this.setTimingForm.controls['TuesdayStartTime'].value,
        EndTime: this.setTimingForm.controls['TuesdayEndTime'].value
      },
      {
        Day: "Wednesday",
        StartTime: this.setTimingForm.controls['WednesdayStartTime'].value,
        EndTime: this.setTimingForm.controls['WednesdayEndTime'].value
      },
      {
        Day: "Thursday",
        StartTime: this.setTimingForm.controls['ThursdayStartTime'].value,
        EndTime: this.setTimingForm.controls['ThursdayEndTime'].value
      },
      {
        Day: "Friday",
        StartTime: this.setTimingForm.controls['FridayStartTime'].value,
        EndTime: this.setTimingForm.controls['FridayEndTime'].value
      },
      {
        Day: "Saturday",
        StartTime: this.setTimingForm.controls['SaturdayStartTime'].value,
        EndTime: this.setTimingForm.controls['SaturdayEndTime'].value
      },
      {
        Day: "Sunday",
        StartTime: this.setTimingForm.controls['SundayStartTime'].value,
        EndTime: this.setTimingForm.controls['SundayEndTime'].value
      }
    ]
    this.menuService.setTimingsForm(body);
    this.Timings = this.menuService.timingsForm;
  }
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  getRestaurantCategory(RestaurantCategory: any) {
    this.ResCategoryId = RestaurantCategory;
    this.ResCategoryId = this.ResCategoryId.slice(0, 10);
    this.ResCategoryName = RestaurantCategory;
    this.ResCategoryName = this.ResCategoryName.slice(10, 50);
    this.restaurantService.RestuarantIDForStaffList(this.ResCategoryId);
  }


  getCategory() {
    debugger
    this.restaurantService.getCategoryName().subscribe(
      data => {
        this.CategoryList = data['data'];
      },
      err => {

      }
    );
  }

  addCategory() {
    this.boo = true;
    let body = {
      CategoryName: this.restaurantAddForm.value.categoryName
    }
    this.restaurantService.addCategory(body).subscribe(
      data => {
        this.DisplayMessage = true;
        this.getCategory();
        this.ngOnInit();
      },
      err => {
        this.DisplayMessage = false;
      }
    );
  }

  Uploadimage() {
    this.restaurantService.postFile(this.fileToUpload).subscribe(
      data => {
        //  Caption.value = null;
        // Image.value = null;
        this.imageUrl = data['Imageurl'];
      }
    );
  }
  showSuccess() {
    this.toastr.success('', 'Restaurant Added Successfully', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  showError() {
    this.toastr.error('', 'Restaurant Not Added!', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  showSuccessForUpdate() {
    this.toastr.success('', 'Restaurant Updated Successfully', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  showErrorForUpdate() {
    this.toastr.error('', 'Restaurant Not Updated!', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  onSubmit() {
    debugger
    this.cancel = true;
    if (this.restaurantAddForm.controls['ServiceCharges'].value == "") {
      this.restaurantAddForm.controls['ServiceCharges'].setValue(0);
    }
    this.menuService.cancelF(this.cancel);

    let body =
    {
      RestaurantName: this.restaurantAddForm.controls['RestaurantName'].value,
      Address: this.restaurantAddForm.controls['Address'].value,
      OwnerID: this.OwnerId,
      NTNNumber: this.restaurantAddForm.controls['NTN'].value,
      RestaurantCategory: this.ResCategoryName,
      ServicesCharges: this.restaurantAddForm.controls['ServiceCharges'].value,
      RestaurantVerified: this.restaurantAddForm.controls['RestaurantVerified'].value,
      CategoryID: this.ResCategoryId,
      Discounts: this.discountsArr,
      Delivery: this.deliveryArr,
      Timings: this.Timings,
      Image: this.imageUrl
    }
    this.restaurantService.addRestaurant(body).subscribe(
      data => {
        this.showSuccess();
        this.RestaurantId = data.data.RestaurantID;
        localStorage.setItem("RestaurantID", this.RestaurantId);
        this.RestaurantID = data.data.RestaurantID;
        this.restaurantService.updateRestaurantID(this.RestaurantId);

        this.restaurantService.updateRestaurantList(this.restaurantAddForm);

        this.restaurantService.AllRestaurants(this.OwnerId);

        ++this.countOfRestaurant;
        localStorage.setItem("countOfRestaurant", this.countOfRestaurant.toString());

        this.menuService.editRestaurant(undefined);
        var clearVarDisDelArr = "clear";
        this.menuService.addDeliveryForm(clearVarDisDelArr);
        this.menuService.addDiscountForm(clearVarDisDelArr);
        this.restaurantAddForm.reset();
        this.addDiscountForm.reset();
        this.addDeliveryForm.reset();
        this.ngOnInit();
        this.router.navigate(['/restaurant/restaurant-list']);
        // this.restaurantService


      },
      err => {
        this.showError();
        this.error = err.error.data.description;
        this.loading = false;

      });


  }
  updateRestaurant() {
    this.RestaurantID = localStorage.getItem("restaurantIdforProfile");
    this.cancel = true;
    if (this.restaurantAddForm.controls['ServiceCharges'].value == "") {
      this.restaurantAddForm.controls['ServiceCharges'].setValue(0);
    }
    this.menuService.cancelF(this.cancel);

    let body =
    {
      //RestaurantID: this.RestaurantId,
      RestaurantName: this.restaurantAddForm.controls['RestaurantName'].value,
      Address: this.restaurantAddForm.controls['Address'].value,
      OwnerID: this.OwnerId,
      NTNNumber: this.restaurantAddForm.controls['NTN'].value,
      RestaurantCategory: this.ResCategoryName,
      ServicesCharges: this.restaurantAddForm.controls['ServiceCharges'].value,
      RestaurantVerified: this.restaurantAddForm.controls['RestaurantVerified'].value,
      CategoryID: this.ResCategoryId,
      Discounts: this.discountsArr,
      Delivery: this.deliveryArr,
      Timings: this.Timings,
      Image: this.imageUrl
    }
    this.restaurantService.updateRestaurant(body, this.RestaurantID).subscribe(
      data => {
        if (data['Message'] == "Success") {
          this.showSuccessForUpdate();
        }
        this.menuService.editRestaurant(undefined);
        var clearVarDisDelArr = "clear";
        this.menuService.addDeliveryForm(clearVarDisDelArr);
        this.menuService.addDiscountForm(clearVarDisDelArr);
        this.restaurantAddForm.reset();
        this.addDiscountForm.reset();
        this.addDeliveryForm.reset();
        this.ngOnInit();
        // this.RestaurantId = data.data.RestaurantID;
        // localStorage.setItem("RestaurantID", this.RestaurantId);
        // this.RestaurantID = data.data.RestaurantID;
        // this.restaurantService.updateRestaurantID(this.RestaurantId);

        // this.restaurantService.updateRestaurantList(this.restaurantAddForm);

        // this.restaurantService.AllRestaurants(this.OwnerId);

        // ++this.countOfRestaurant;
        // localStorage.setItem("countOfRestaurant", this.countOfRestaurant.toString());
        // var clearVarDisDelArr = "clear";
        // this.menuService.addDeliveryForm(clearVarDisDelArr);
        // this.menuService.addDiscountForm(clearVarDisDelArr);
        this.router.navigate(['/restaurant/restaurant-list']);
        // this.restaurantService


      },
      err => {
        this.showErrorForUpdate();
        this.error = err.error.data.description;
        this.loading = false;

      });
  }
  canceled() {
    this.ngOnInit();
    this.router.navigate(['/restaurant/restaurant-list']);
  }
  clearFields() {
    if ('/restaurant/restaurant-add' == this.router.url) {
      this.menuService.editRestaurant(undefined);
      var clearVarDisDelArr = "clear";
      this.menuService.addDeliveryForm(clearVarDisDelArr);
      this.menuService.addDiscountForm(clearVarDisDelArr);
      this.restaurantAddForm.reset();
      this.addDiscountForm.reset();
      this.addDeliveryForm.reset();
    }
  }
}

