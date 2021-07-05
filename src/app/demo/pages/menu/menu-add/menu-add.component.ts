import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from 'src/app/shared/services/menu.service';
import { Router } from '@angular/router';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-menu-add',
  templateUrl: './menu-add.component.html',
  styleUrls: ['./menu-add.component.scss'],
  providers: [RestaurantService]
})
export class MenuAddComponent implements OnInit {
  addMenuForm: FormGroup;
  VariantsArray: any;
  replaced: boolean = false;
  preFilledValue: any;
  Name: string;
  VariantAdded: boolean = false;
  Spices: string;
  MenuID: any;
  Price: string;
  addMode: boolean = true;
  Quantity: string;
  Serving: string;
  Ingrediants: string;
  cancel: boolean;
  RestaurantId: any;
  onlyId: any;
  menuCategoryList: any;
  categoryid: any;
  MenuCategory: any = "";
  RestaurantCategoryName: any;
  VariantId: any;
  RestaurantCategoryId: any;
  menuCategoryname: any = "";
  imageUrl: string;
  VariantID: any;
  FormValues: any;
  VariantName: any;
  editForm: boolean = false;
  addForm: boolean = true;
  fileToUpload: File = null;
  addVariantForm: FormGroup;
  variantArrayCheck: boolean = false;
  constructor(private formBuilder: FormBuilder, private menuService: MenuService, private router: Router, private restaurantService: RestaurantService, private toastr: ToastrService) {
    this.VariantsArray = [];
    this.menuCategoryList = [];
  }

  ngOnInit(): void {
    this.addMenuForm = this.formBuilder.group({
      MenuName: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Za-z].{2,}")]),
      RefId: new FormControl('', [
        Validators.required]),
      // ItemPrice: new FormControl('', [
      //   Validators.required]),
      MenuCategoryName: new FormControl('', [
        Validators.required]),
      // CalculatedPrice: new FormControl('', []),
      MenuAvailability: new FormControl('', [
        Validators.required]),
      Description: new FormControl('', []),
      ItemPrice: new FormControl('', [
        Validators.pattern("^[0-9][A-Za-z0-9 -]*$")]),
      CalculatedPrice: new FormControl('', []),
      // Description: new FormControl('', []),
      DiscountPrice: new FormControl('', []),
      // DiscountPrice: new FormControl('', [
      //   Validators.required]),
      AttachImage: new FormControl('', [Validators.required])
    }
    );
    this.addVariantForm = this.formBuilder.group({
      itemName: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Za-z].{2,}")]),
      ItemPrice: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9][A-Za-z0-9 -]*$")]),
      CalculatedPrice: new FormControl('', []),
      // Description: new FormControl('', []),
      DiscountPrice: new FormControl('', [
        Validators.required]),
      Description: new FormControl('', [
        Validators.required]),
    }
    );
    this.RestaurantCategoryName = localStorage.getItem("RestaurantCategoryName");
    this.RestaurantCategoryId = localStorage.getItem("RestaurantCategoryID");
    this.menuService.updateMenuList(this.addMenuForm);
    this.menuService.POSMenu(this.addMenuForm);
    this.RestaurantId = localStorage.getItem("restaurantIdforProfile");
    this.onlyId = localStorage.getItem("onlyID");
    this.showcategorylist();

    // this.Name = this.menuService.Items.name;
    // this.Spices = this.menuService.Items.spices;
    // this.Price = this.menuService.Items.price;
    // this.Quantity = this.menuService.Items.quantity;
    // this.Serving = this.menuService.Items.serving;
    // // this.addMenuForm.value.Ingrediants = this.menuService.Items.ingredients;

    //this.addMenuForm.controls['MenuName'].patchValue(this.restaurantService.addMenuFormValues.MenuName);
    //this.addMenuForm.controls['MenuName'].patchValue(this.restaurantService.addMenuFormValues[0].MenuName);
    // this.addMenuForm.controls['StartDateTime'].patchValue(this.menuService.Items.startdatetime);
    // this.addMenuForm.controls['EndDateTime'].patchValue(this.menuService.Items.enddatetime);
    // this.addMenuForm.controls['PromoPrice'].patchValue(this.menuService.Items.promoprice);
    // this.addMenuForm.controls['MenuCategory'].patchValue(this.menuService.Items.menucategory);
    // this.addMenuForm.controls['MenuAvailability'].patchValue(this.menuService.Items.menuavailability);

    // this.xyz = this.menuService.decide;
    this.variantArrayCheck = false;
    this.VariantsArray = [];
    this.VariantAdded = false;
    this.editFormValues();
    this.checkVariant();
  }
  checkVariant() {
    if (this.VariantsArray.length > 0) {
      this.addMenuForm.controls['ItemPrice'].setValue(0);
      this.addMenuForm.controls['DiscountPrice'].setValue(0);
    }
  }
  editFormValues() {
    
    if (this.menuService.addMenuFormValues != undefined) {
      this.addForm = false;
      this.editForm = true;

      if (this.menuService.addMenuFormValues.isVariant == false) {
        this.MenuCategory = this.menuService.addMenuFormValues.MenuCategory;
        this.MenuID = this.menuService.addMenuFormValues.MenuID;
        for (let i = 0; i < this.menuCategoryList.length; i++) {
          if (this.menuCategoryList[i].CategoryName == this.MenuCategory) {
            this.categoryid = this.menuCategoryList[i].CategoryID;
            break;
          }
        }
        this.addMenuForm.patchValue({
          MenuName: this.menuService.addMenuFormValues.MenuName,
          RefId: this.menuService.addMenuFormValues.RefID,
          Description: this.menuService.addMenuFormValues.Description,
          ItemPrice: this.menuService.addMenuFormValues.ItemPrice,
          CalculatedPrice: this.menuService.addMenuFormValues.CalculatedPrice,
          DiscountPrice: this.menuService.addMenuFormValues.Discount,
          //MenuCategoryName: this.menuService.addMenuFormValues.MenuCategory,
          MenuAvailability: this.menuService.addMenuFormValues.MenuAvailable,
          //AttachImage: this.menuService.addMenuFormValues.Image
        });
      }
      else {
        this.MenuID = this.menuService.addMenuFormValues.MenuID;
        this.MenuCategory = this.menuService.addMenuFormValues.MenuCategory;
        for (let i = 0; i < this.menuCategoryList.length; i++) {
          if (this.menuCategoryList[i].CategoryName == this.MenuCategory) {
            this.categoryid = this.menuCategoryList[i].CategoryID;
            break;
          }
        }
        this.addMenuForm.patchValue({
          MenuName: this.menuService.addMenuFormValues.MenuName,
          RefId: this.menuService.addMenuFormValues.RefID,
          Description: this.menuService.addMenuFormValues.Description,
          //MenuCategoryName: this.menuService.addMenuFormValues.MenuCategory,
          MenuAvailability: this.menuService.addMenuFormValues.MenuAvailable,
          //AttachImage: this.menuService.addMenuFormValues.Image
        });

        for (let i = 0; i < this.menuService.addMenuFormValues.Variant.length; i++) {
          this.menuService.addVariantForm(this.menuService.addMenuFormValues.Variant[i]);
        }

        // this.menuService.addVariantForm(this.menuService.addMenuFormValues.Variant);
        this.VariantsArray = this.menuService.variantsArray;
        //this.VariantsArray = this.menuService.addMenuFormValues.Variant;
        this.VariantAdded = true;
        this.variantArrayCheck = true;
      }
    }
    else {
      return
    }
    this.checkVariant();
  }
  editVariant(variantID: any) {
    this.addMode = false;
    for (let i = 0; i < this.VariantsArray.length; i++) {
      if (this.VariantsArray[i].VariantID == variantID) {
        this.VariantId = variantID;
        this.addVariantForm.patchValue({
          itemName: this.VariantsArray[i].ItemName,
          ItemPrice: this.VariantsArray[i].ItemPrice,
          CalculatedPrice: this.VariantsArray[i].CalculatedPrice,
          DiscountPrice: this.VariantsArray[i].DiscountPrice,
          Description: this.VariantsArray[i].Description,
        });
      }
    }
    this.checkVariant();
  }
  updateVartiantForm() {
    let body = {
      VariantID: this.VariantId,
      ItemName: this.addVariantForm.controls['itemName'].value,
      ItemPrice: this.addVariantForm.controls['ItemPrice'].value,
      CalculatedPrice: (Math.round(this.addVariantForm.controls['ItemPrice'].value - ((this.addVariantForm.controls['ItemPrice'].value * this.addVariantForm.controls['DiscountPrice'].value) / 100))),
      DiscountPrice: this.addVariantForm.controls['DiscountPrice'].value,
      Description: this.addVariantForm.controls['Description'].value
    }

    for (let i = 0; i < this.VariantsArray.length; i++) {

      if (this.VariantsArray[i].VariantID == this.VariantId) {
        this.VariantsArray[i] = body;
        this.replaced = true;
        this.addVariantForm.reset();
        this.VariantId = "";
        this.VariantAdded = true;
        this.variantArrayCheck = true;
      }
    }
    this.checkVariant();
  }
  addVartiantForm() {
    //this.replaced = false;
    let body = {
      ItemName: this.addVariantForm.controls['itemName'].value,
      ItemPrice: this.addVariantForm.controls['ItemPrice'].value,
      CalculatedPrice: (Math.round(this.addVariantForm.controls['ItemPrice'].value - ((this.addVariantForm.controls['ItemPrice'].value * this.addVariantForm.controls['DiscountPrice'].value) / 100))),
      DiscountPrice: this.addVariantForm.controls['DiscountPrice'].value,
      Description: this.addVariantForm.controls['Description'].value
    }
    this.menuService.addVariantForm(body);
    this.VariantsArray = this.menuService.variantsArray;
    function compare(a, b) {
      if (a.CalculatedPrice < b.CalculatedPrice) {
        return -1;
      }
      if (a.CalculatedPrice > b.CalculatedPrice) {
        return 1;
      }
      return 0;
    }

    this.VariantsArray.sort(compare);
    //this.VariantsArray.push(body);
    this.VariantAdded = true;
    this.variantArrayCheck = true;
    this.checkVariant();
  }
  setDeleteVariant(variantID: any, variantName: any) {
    this.VariantID = variantID;
    this.VariantName = variantName;
    this.checkVariant();
  }
  confirmDelete() {
    for (let i = 0; i < this.VariantsArray.length; i++) {
      if (this.VariantID == this.VariantsArray[i].VariantID) {
        this.VariantsArray.splice(i, 1);
      }
    }
    this.checkVariant();
  }
  showSuccess() {
    this.toastr.success('', 'New Item Added', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  showError() {
    this.toastr.error('', 'Item Not Added!', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  showSuccessVariant() {
    this.toastr.success('', 'Item Updated', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  showErrorVariant() {
    this.toastr.error('', 'Item Not Updated!', {
      timeOut: 3000,
      'progressBar': true,
    });
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
  Uploadimage() {
    this.restaurantService.postFile(this.fileToUpload).subscribe(
      data => {
        //  Caption.value = null;
        // Image.value = null;
        this.imageUrl = data['Imageurl'];
      },
      err => {
        console.log(err);
      }
    );
  }
  showcategorylist() {
    this.restaurantService.getMenuCategoryList(this.RestaurantId).subscribe(
      data => {
        this.menuCategoryList = data['data'];
        this.restaurantService.updateMenuCategoryList(this.menuCategoryList);
      },
      err => {
      }
    );
  }
  getCategoryData(CategoryInfo: any) {
    this.categoryid = CategoryInfo;
    this.categoryid = this.categoryid.slice(0, 10);

    this.menuCategoryname = CategoryInfo;
    this.menuCategoryname = this.menuCategoryname.slice(10, 50);
  }

  clearAddVariantForm() {
    this.addMode = true;
    this.addVariantForm.reset();
  }

  onSubmit() {
    this.cancel = true;
    this.menuService.cancelF(this.cancel);

    if (this.VariantsArray.length > 0) {
      let body =
      {
        MenuName: this.addMenuForm.controls['MenuName'].value,
        //  ItemPrice: (Math.round(this.addMenuForm.controls['ItemPrice'].value)),
        RestaurantID: this.RestaurantId,
        MenuCategory: this.menuCategoryname,
        //  Discount: (Math.round(this.addMenuForm.controls['DiscountPrice'].value)),
        MenuAvailable: this.addMenuForm.controls['MenuAvailability'].value,
        CategoryID: this.categoryid,
        Description: this.addMenuForm.controls['Description'].value,
        //  CalculatedPrice: (Math.round(this.addMenuForm.controls['ItemPrice'].value - ((this.addMenuForm.controls['ItemPrice'].value * this.addMenuForm.controls['DiscountPrice'].value) / 100))),
        RestaurantRefID: this.onlyId,
        RefID: this.addMenuForm.controls['RefId'].value,
        Image: this.imageUrl,
        isVariant: this.VariantAdded,
        ItemPrice: 0,
        Discount: 0,
        CalculatedPrice: 0,
        Variant: this.menuService.variantsArray
      }
      this.restaurantService.addMenuItem(body).subscribe(
        data => {
          this.showSuccess();
          this.restaurantService.getItemsList(this.RestaurantId);
          this.VariantsArray = [];
          this.addMenuForm.reset();
          this.addVariantForm.reset();
          this.MenuCategory = "";
          this.menuCategoryname = "";
          var clearVarArr = "clear";
          this.menuService.addVariantForm(clearVarArr);
          this.router.navigate(['/menu/menu-list']);
        },
        err => {
          this.showError();
          //this.error = err.error.data.description;
          //this.loading = false;
        });
    }
    if (this.VariantsArray.length == 0) {
      let body =
      {
        MenuName: this.addMenuForm.controls['MenuName'].value,
        //  ItemPrice: (Math.round(this.addMenuForm.controls['ItemPrice'].value)),
        RestaurantID: this.RestaurantId,
        MenuCategory: this.menuCategoryname,
        //  Discount: (Math.round(this.addMenuForm.controls['DiscountPrice'].value)),
        MenuAvailable: this.addMenuForm.controls['MenuAvailability'].value,
        CategoryID: this.categoryid,
        Description: this.addMenuForm.controls['Description'].value,
        //  CalculatedPrice: (Math.round(this.addMenuForm.controls['ItemPrice'].value - ((this.addMenuForm.controls['ItemPrice'].value * this.addMenuForm.controls['DiscountPrice'].value) / 100))),
        RestaurantRefID: this.onlyId,
        RefID: this.addMenuForm.controls['RefId'].value,
        Image: this.imageUrl,
        isVariant: this.VariantAdded,
        ItemPrice: (Math.round(this.addMenuForm.controls['ItemPrice'].value)),
        Discount: (Math.round(this.addMenuForm.controls['DiscountPrice'].value)),
        CalculatedPrice: (Math.round(this.addMenuForm.controls['ItemPrice'].value - ((this.addMenuForm.controls['ItemPrice'].value * this.addMenuForm.controls['DiscountPrice'].value) / 100))),
        Variant: this.restaurantService.variantsArray
      }
      this.restaurantService.addMenuItem(body).subscribe(
        data => {
          this.showSuccess();
          this.restaurantService.getItemsList(this.RestaurantId);
          var clearVarArr = "clear";
          this.menuService.addVariantForm(clearVarArr);
          this.router.navigate(['/menu/menu-list']);
        },
        err => {
          this.showError();
          //this.error = err.error.data.description;
          //this.loading = false;
        });
    }
  }
  updateMenuItem() {
    this.cancel = true;
    if (this.menuCategoryname != "") {
      this.MenuCategory = this.menuCategoryname;
    }
    this.menuService.cancelF(this.cancel);
    for (let i = 0; i < this.menuCategoryList.length; i++) {
      if (this.menuCategoryList[i].CategoryName == this.MenuCategory) {
        this.categoryid = this.menuCategoryList[i].CategoryID;
        break;
      }
    }
    if (this.VariantsArray.length > 0) {
      let body =
      {
        MenuName: this.addMenuForm.controls['MenuName'].value,
        MenuID: this.MenuID,
        //  ItemPrice: (Math.round(this.addMenuForm.controls['ItemPrice'].value)),
        RestaurantID: this.RestaurantId,
        MenuCategory: this.MenuCategory,
        //  Discount: (Math.round(this.addMenuForm.controls['DiscountPrice'].value)),
        MenuAvailable: this.addMenuForm.controls['MenuAvailability'].value,
        CategoryID: this.categoryid,
        Description: this.addMenuForm.controls['Description'].value,
        //  CalculatedPrice: (Math.round(this.addMenuForm.controls['ItemPrice'].value - ((this.addMenuForm.controls['ItemPrice'].value * this.addMenuForm.controls['DiscountPrice'].value) / 100))),
        RestaurantRefID: this.onlyId,
        RefID: this.addMenuForm.controls['RefId'].value,
        Image: this.imageUrl,
        isVariant: this.VariantAdded,
        ItemPrice: 0,
        Discount: 0,
        CalculatedPrice: 0,
        Variant: this.menuService.variantsArray
      }
      this.restaurantService.updateMenuItem(body).subscribe(
        data => {
          this.showSuccessVariant();
          this.restaurantService.getItemsList(this.RestaurantId);
          this.VariantsArray = [];
          this.addMenuForm.reset();
          this.addVariantForm.reset();
          this.MenuCategory = "";
          this.menuCategoryname = "";
          var clearVarArr = "clear";
          this.menuService.addVariantForm(clearVarArr);
          this.router.navigate(['/menu/menu-list']);
        },
        err => {
          this.showErrorVariant();
          //this.error = err.error.data.description;
          //this.loading = false;

        });
    }
    if (this.VariantsArray.length == 0) {
      let body =
      {
        MenuName: this.addMenuForm.controls['MenuName'].value,
        MenuID: this.MenuID,
        //  ItemPrice: (Math.round(this.addMenuForm.controls['ItemPrice'].value)),
        RestaurantID: this.RestaurantId,
        MenuCategory: this.MenuCategory,
        //  Discount: (Math.round(this.addMenuForm.controls['DiscountPrice'].value)),
        MenuAvailable: this.addMenuForm.controls['MenuAvailability'].value,
        CategoryID: this.categoryid,
        Description: this.addMenuForm.controls['Description'].value,
        //  CalculatedPrice: (Math.round(this.addMenuForm.controls['ItemPrice'].value - ((this.addMenuForm.controls['ItemPrice'].value * this.addMenuForm.controls['DiscountPrice'].value) / 100))),
        RestaurantRefID: this.onlyId,
        RefID: this.addMenuForm.controls['RefId'].value,
        Image: this.imageUrl,
        isVariant: this.VariantAdded,
        ItemPrice: (Math.round(this.addMenuForm.controls['ItemPrice'].value)),
        Discount: (Math.round(this.addMenuForm.controls['DiscountPrice'].value)),
        CalculatedPrice: (Math.round(this.addMenuForm.controls['ItemPrice'].value - ((this.addMenuForm.controls['ItemPrice'].value * this.addMenuForm.controls['DiscountPrice'].value) / 100))),
        Variant: this.restaurantService.variantsArray
      }
      this.restaurantService.updateMenuItem(body).subscribe(
        data => {
          this.showSuccessVariant();
          this.restaurantService.getItemsList(this.RestaurantId);
          var clearVarArr = "clear";
          this.menuService.addVariantForm(clearVarArr);
          this.router.navigate(['/menu/menu-list']);
        },
        err => {
          this.showErrorVariant();
          //this.error = err.error.data.description;
          //this.loading = false;
        });
    }
  }

  canceled() {
    this.menuService.addMenuFormValues = undefined;
    this.VariantsArray = [];
    this.addMenuForm.reset();
    this.addVariantForm.reset();
    this.MenuCategory = "";
    this.menuCategoryname = "";
    var clearVarArr = "clear";
    this.menuService.addVariantForm(clearVarArr);
    this.router.navigate(['/menu/menu-list']);
  }


}
