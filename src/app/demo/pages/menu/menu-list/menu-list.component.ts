import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/shared/services/menu.service';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuListComponent implements OnInit {
  menu: any;
  condition: boolean = false;
  cancel: boolean;
  RestaurantID: any;
  allitemsList: any;
  menuCategoryList: any;
  variantPresent: boolean = false;
  variantsArray: any;
  itemName: any = "";
  itemID: any = "";
  formsValue: any;
  constructor(private menuService: MenuService, private router: Router, private restaurantService: RestaurantService, private toastr: ToastrService) {
    this.variantsArray = [];
  }

  ngOnInit(): void {
    this.menu = this.menuService.menu;
    this.condition = this.menuService.foo;
    this.cancel = this.menuService.cancelD;
    this.RestaurantID = localStorage.getItem("restaurantIdforProfile");
    this.itemsList();
    this.showcategorylist();
    this.variantPresent = false;
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
        for (let i = 0; i < this.allitemsList.length; i++) {
          //if (typeof this.allitemsList[i].CalculatedPrice === 'number') {
          if (this.allitemsList[i].isVariant == true) {

            this.allitemsList[i].CalculatedPrice = this.allitemsList[i].Variant[0].CalculatedPrice;
          }
          //this.allitemsList[i].CalculatedPrice = Math.round(this.allitemsList[i].CalculatedPrice);
          // }
        }
        // for (let i = 0; i <= this.allitemsList.length; i++) {
        //  Math.round(this.allitemsList[i].CalculatedPrice);
        //  this.allitemsList[i].CalculatedPrice.toLocaleString();
        // }

        // for (let i = 0; i <= this.allitemsList.length; i++) {
        //   this.variantsArray.push(this.allitemsList[i].Variant);
        // }

        // for (let i = 0; i <= this.allitemsList.length; i++) {
        //   this.variantPresent = false;
        //   if (this.allitemsList[i].Variant.length > 0) {
        //     this.variantPresent = true;
        //   }
        // }


        //this.restaurantService.updateMenuCategoryList(this.allitemsList);
      },
      err => {
      }
    );

  }

  addNew() {
    this.router.navigate(['/menu/menu-add']);
  }

  editMenu() {
    var emptyArr = [];
    this.menuService.addVariantForm(emptyArr);
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

  setDeleteItem(menuID: any, menuName: any) {
    this.itemName = menuName;
    this.itemID = menuID;
  }
  confirmDelete() {
    this.restaurantService.deleteMenu(this.itemID).subscribe(
      data => {
        this.showSuccess();
        this.ngOnInit();
      },
      err => {
        this.showError();
      }
    );
  }
  editItem(menuID: any) {
    for (let i = 0; i < this.allitemsList.length; i++) {
      if (menuID == this.allitemsList[i].MenuID) {
        // this.formsValue = this.allitemsList[i];
        // delete this.formsValue.Image;
        let body = {
          CalculatedPrice: this.allitemsList[i].CalculatedPrice,
          CategoryID: this.allitemsList[i].CategoryID,
          Description: this.allitemsList[i].Description,
          Discount: this.allitemsList[i].Discount,
          Image: this.allitemsList[i].Image,
          ItemPrice: this.allitemsList[i].ItemPrice,
          MenuAvailable: this.allitemsList[i].MenuAvailable,
          MenuCategory: this.allitemsList[i].MenuCategory,
          MenuID: this.allitemsList[i].MenuID,
          MenuName: this.allitemsList[i].MenuName,
          RefID: this.allitemsList[i].RefID,
          Restaurant: this.allitemsList[i].Restaurant,
          RestaurantID: this.allitemsList[i].RestaurantID,
          Variant: this.allitemsList[i].Variant,
          isVariant: this.allitemsList[i].isVariant,
        }
        this.menuService.patchFormValue(body);
        break;
      }
    }
    setTimeout(() => {
      this.router.navigate(['/menu/menu-edit']);
    }, 500);

  }
  showSuccess() {
    this.toastr.success('', 'Item Deleted', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  showError() {
    this.toastr.error('', 'Item Not Deleted!', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
}
