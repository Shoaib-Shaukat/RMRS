import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/shared/services/menu.service';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DealsComponent implements OnInit {
  menu: any;
  condition: boolean = false;
  cancel: boolean;
  RestaurantID: any;
  variantArray: any;
  allitemsList: any;
  isVariant: boolean = false;
  menuCategoryList: any;
  variantPresent: boolean = false;
  variantsArray: any;
  count: number = 0;
  DealsItem: any;
  allitemsListCopy: any;
  openPopup: boolean = false;
  ConfirmationForm: FormGroup;
  imageUrl: string;
  fileToUpload: File = null;
  Name: any = "";
  Variant: any = "";
  calculatedPrice: number = 0;
  Description: string = "";
  constructor(private menuService: MenuService, private formBuilder: FormBuilder, private router: Router, private restaurantService: RestaurantService, private toastr: ToastrService) {
    this.variantsArray = [];
    this.DealsItem = [];
  }

  ngOnInit(): void {
    this.menu = this.menuService.menu;
    this.condition = this.menuService.foo;
    this.cancel = this.menuService.cancelD;
    this.RestaurantID = localStorage.getItem("restaurantIdforProfile");
    this.itemsList();
    this.showcategorylist();
    this.variantPresent = false;
    this.ConfirmationForm = this.formBuilder.group({
      DealName: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Za-z].{2,}")]),
      DealPrice: new FormControl('', [
        Validators.required]),
      AttachImage: new FormControl('', [
        Validators.required])

    }
    );
  }

  showSuccess() {
    this.toastr.success('', 'New Deal Added', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  showError() {
    this.toastr.error('', 'Deal Not Added!', {
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
    this.restaurantService.dealsPostFile(this.fileToUpload).subscribe(
      data => {
        //  Caption.value = null;
        // Image.value = null;
        this.imageUrl = data['Imageurl'];
      }
    );
  }
  showcategorylist() {
    this.restaurantService.getMenuCategoryList(this.RestaurantID).subscribe(
      data => {
        this.menuCategoryList = data['data'];
        this.restaurantService.updateMenuCategoryList(this.menuCategoryList);
      },
      err => {
      }
    );
  }
  itemsList() {
    this.restaurantService.getItemsList(this.RestaurantID).subscribe(
      data => {
        this.allitemsList = data['data'];

        this.allitemsListCopy = this.allitemsList;

        for (let i = 0; i < this.allitemsListCopy.length; i++) {
          if (this.allitemsListCopy[i].isVariant == true) {
            for (let j = 0; j < this.allitemsListCopy[i].Variant.length; j++) {
              this.allitemsListCopy[i].Variant[j].VariantQuantity = 1;
            }
          }
          else {
            this.allitemsListCopy[i].Quantity = 1;
          }
        }
      },
      err => {
      }
    );

  }

  addNew() {
    this.router.navigate(['/menu/menu-add']);
  }

  editMenu() {
    let menuItem = {
      menuname: this.menuService.menu.value.MenuName,
      price: this.menuService.menu.value.Price,
      startdatetime: this.menuService.menu.value.StartDateTime,
      enddatetime: this.menuService.menu.value.EndDateTime,
      promoprice: this.menuService.menu.value.PromoPrice,
      menucategory: this.menuService.menu.value.MenuCategory,
      menuavailability: this.menuService.menu.value.MenuAvailability,
    }
    this.menuService.preFilledMenu(menuItem);
    this.router.navigate(['/menu/menu-add']);
  }
  minusVQ(Name: any, Variant: any) {
    this.calculatedPrice = 0;
    for (let i = 0; i < this.allitemsListCopy.length; i++) {
      for (let j = 0; j < this.allitemsListCopy[i].Variant.length; j++) {
        if (this.allitemsListCopy[i].Variant[j].VariantQuantity > 1) {
          if (Name == this.allitemsListCopy[i].MenuName && Variant == this.allitemsListCopy[i].Variant[j].ItemName) {
            this.allitemsListCopy[i].Variant[j].VariantQuantity = this.allitemsListCopy[i].Variant[j].VariantQuantity - 1;
            for (let k = 0; k < this.DealsItem.length; k++) {
              if (Name == this.DealsItem[k].MenuName && Variant == this.DealsItem[k].VaraintName) {
                this.DealsItem[k].VaraintQuantity = this.DealsItem[k].VaraintQuantity - 1;

              }
            }
          }
        }
      }
    }
    for (let i = 0; i < this.DealsItem.length; i++) {
      if (this.DealsItem[i].Quantity) {
        this.calculatedPrice = this.calculatedPrice + (this.DealsItem[i].MenuPrice * this.DealsItem[i].Quantity);
      }
      else {
        this.calculatedPrice = this.calculatedPrice + (this.DealsItem[i].MenuPrice * this.DealsItem[i].VaraintQuantity);
      }
    }
  }
  addVQ(Name: any, Variant: any) {
    this.calculatedPrice = 0;
    for (let i = 0; i < this.allitemsListCopy.length; i++) {
      for (let j = 0; j < this.allitemsListCopy[i].Variant.length; j++) {
        if (Name == this.allitemsListCopy[i].MenuName && Variant == this.allitemsListCopy[i].Variant[j].ItemName) {
          this.allitemsListCopy[i].Variant[j].VariantQuantity = this.allitemsListCopy[i].Variant[j].VariantQuantity + 1;
          for (let k = 0; k < this.DealsItem.length; k++) {
            if (Name == this.DealsItem[k].MenuName && Variant == this.DealsItem[k].VaraintName) {
              this.DealsItem[k].VaraintQuantity = this.DealsItem[k].VaraintQuantity + 1;
            }
          }
        }

      }
    }
    for (let i = 0; i < this.DealsItem.length; i++) {
      if (this.DealsItem[i].Quantity) {
        this.calculatedPrice = this.calculatedPrice + (this.DealsItem[i].MenuPrice * this.DealsItem[i].Quantity);
      }
      else {
        this.calculatedPrice = this.calculatedPrice + (this.DealsItem[i].MenuPrice * this.DealsItem[i].VaraintQuantity);
      }

    }
  }
  minusVQNoV(Name: any) {
    this.calculatedPrice = 0;
    for (let i = 0; i < this.allitemsListCopy.length; i++) {
      if (this.allitemsListCopy[i].Quantity > 1) {
        if (Name == this.allitemsListCopy[i].MenuName) {
          this.allitemsListCopy[i].Quantity = this.allitemsListCopy[i].Quantity - 1;
          for (let k = 0; k < this.DealsItem.length; k++) {
            if (Name == this.DealsItem[k].MenuName) {
              this.DealsItem[k].Quantity = this.DealsItem[k].Quantity - 1;

            }
          }
        }
      }
    }
    for (let i = 0; i < this.DealsItem.length; i++) {
      if (this.DealsItem[i].Quantity) {
        this.calculatedPrice = this.calculatedPrice + (this.DealsItem[i].MenuPrice * this.DealsItem[i].Quantity);
      }
      else {
        this.calculatedPrice = this.calculatedPrice + (this.DealsItem[i].MenuPrice * this.DealsItem[i].VaraintQuantity);
      }

    }
  }
  addVQNoV(Name: any) {
    this.calculatedPrice = 0;
    for (let i = 0; i < this.allitemsListCopy.length; i++) {
      if (Name == this.allitemsListCopy[i].MenuName) {
        this.allitemsListCopy[i].Quantity = this.allitemsListCopy[i].Quantity + 1;
        for (let k = 0; k < this.DealsItem.length; k++) {
          if (Name == this.DealsItem[k].MenuName) {
            this.DealsItem[k].Quantity = this.DealsItem[k].Quantity + 1;
          }
        }
      }
    }
    for (let i = 0; i < this.DealsItem.length; i++) {
      if (this.DealsItem[i].Quantity) {
        this.calculatedPrice = this.calculatedPrice + (this.DealsItem[i].MenuPrice * this.DealsItem[i].Quantity);
      }
      else {
        this.calculatedPrice = this.calculatedPrice + (this.DealsItem[i].MenuPrice * this.DealsItem[i].VaraintQuantity);
      }
    }
  }
  checkTheCheckBox(Name: any, Variant: any) {
    if (this.DealsItem.length > 0) {
      for (let i = 0; i < this.DealsItem.length; i++) {
        if (Name == this.DealsItem[i].MenuName && Variant == this.DealsItem[i].VaraintName) {
          return true;
        }
      }
    }
    else {
      return false;
    }
  }
  checkTheCheckBoxForNoVariant(Name: any) {
    if (this.DealsItem.length > 0) {
      for (let i = 0; i < this.DealsItem.length; i++) {
        if (Name == this.DealsItem[i].MenuName) {
          return true;
        }
      }
    }
    else {
      return false;
    }
  }
  itemCheck(checkedOrNot: boolean, categoryId: any, name: any, price: any, variantName: any, variantQuantity: any) {
    this.calculatedPrice = 0;
    if (checkedOrNot) {
      let body = {
        MenuID: categoryId,
        MenuName: name,
        MenuPrice: price,
        VaraintName: variantName,
        VaraintQuantity: variantQuantity
      }
      this.DealsItem.push(body);

      for (let i = 0; i < this.DealsItem.length; i++) {
        if (this.DealsItem[i].Quantity) {
          this.calculatedPrice = this.calculatedPrice + (this.DealsItem[i].MenuPrice * this.DealsItem[i].Quantity);
        }
        else {
          this.calculatedPrice = this.calculatedPrice + (this.DealsItem[i].MenuPrice * this.DealsItem[i].VaraintQuantity);
        }
      }
    }
    else {
      for (let i = 0; i < this.DealsItem.length; i++) {
        if (name == this.DealsItem[i].MenuName && variantName == this.DealsItem[i].VaraintName) {
          this.DealsItem.splice(i, 1);
        }
      }
      for (let i = 0; i < this.DealsItem.length; i++) {
        if (this.DealsItem[i].Quantity) {
          this.calculatedPrice = this.calculatedPrice + (this.DealsItem[i].MenuPrice * this.DealsItem[i].Quantity);
        }
        else {
          this.calculatedPrice = this.calculatedPrice + (this.DealsItem[i].MenuPrice * this.DealsItem[i].VaraintQuantity);
        }
      }
    }
    this.ItemPresentInDealArray();
  }
  itemCheckForNoVariant(checkedOrNot: boolean, categoryId: any, name: any, price: any, quantity: any) {
    this.calculatedPrice = 0;
    if (checkedOrNot) {
      let body = {
        MenuID: categoryId,
        MenuName: name,
        MenuPrice: price,
        Quantity: quantity
      }
      this.DealsItem.push(body);

      for (let i = 0; i < this.DealsItem.length; i++) {
        if (this.DealsItem[i].Quantity) {
          this.calculatedPrice = this.calculatedPrice + (this.DealsItem[i].MenuPrice * this.DealsItem[i].Quantity);
        }
        else {
          this.calculatedPrice = this.calculatedPrice + (this.DealsItem[i].MenuPrice * this.DealsItem[i].VaraintQuantity);
        }
      }

    }
    else {
      for (let i = 0; i < this.DealsItem.length; i++) {
        if (name == this.DealsItem[i].MenuName) {
          this.DealsItem.splice(i, 1);
        }
      }
      for (let i = 0; i < this.DealsItem.length; i++) {
        if (this.DealsItem[i].Quantity) {
          this.calculatedPrice = this.calculatedPrice + (this.DealsItem[i].MenuPrice * this.DealsItem[i].Quantity);
        }
        else {
          this.calculatedPrice = this.calculatedPrice + (this.DealsItem[i].MenuPrice * this.DealsItem[i].VaraintQuantity);
        }
      }
    }
    this.ItemPresentInDealArray();
  }
  ItemPresentInDealArray() {
    if (this.DealsItem.length > 0) {
      this.openPopup = true;
    }
    else {
      this.openPopup = false;
    }
  }
  fillDescription() {
    this.Description = "";
    for (let i = 0; i < this.DealsItem.length; i++) {
      if (i == 0) {
        if (this.DealsItem[i].VaraintQuantity) {
          this.Description = this.Description.concat(this.DealsItem[i].VaraintQuantity.toString(), ' x ', this.DealsItem[i].VaraintName.toString(), ' ', this.DealsItem[i].MenuName.toString());
        }
        else {
          this.Description = this.Description.concat(this.DealsItem[i].Quantity.toString(), ' x ', this.DealsItem[i].MenuName.toString());
        }
      }
      else {
        if (this.DealsItem[i].VaraintQuantity) {
          this.Description = this.Description.concat(', ', this.DealsItem[i].VaraintQuantity.toString(), ' x ', this.DealsItem[i].VaraintName.toString(), ' ', this.DealsItem[i].MenuName.toString());
        }
        else {
          this.Description = this.Description.concat(', ', this.DealsItem[i].Quantity.toString(), ' x ', this.DealsItem[i].MenuName.toString());
        }
      }
    }
  }
  confirmAddDeal() {

    let body =
    {
      RestaurantID: this.RestaurantID,
      DealName: this.ConfirmationForm.controls['DealName'].value,
      DealPrice: this.ConfirmationForm.controls['DealPrice'].value,
      Description: this.Description,
      MenuItems: this.DealsItem,
      Image: this.imageUrl,
      Variant: this.variantsArray,
      isVariant: this.isVariant
    }
    this.restaurantService.addDeal(body).subscribe(
      data => {
        this.showSuccess();
        this.router.navigate(['/menu/deals-list']);
      },
      err => {
        this.showError();
      }
    );
  }
}
