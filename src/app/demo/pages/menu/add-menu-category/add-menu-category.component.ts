import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-menu-category',
  templateUrl: './add-menu-category.component.html',
  styleUrls: ['./add-menu-category.component.scss']
})
export class AddMenuCategoryComponent implements OnInit {
  addMenuCategoryForm: FormGroup;
  RestaurantId: any;
  menuCategoryList: any;
  constructor(private router: Router, private restaurantService: RestaurantService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.addMenuCategoryForm = this.formBuilder.group({
      NameOfCategory: new FormControl('', [
        Validators.required]),
    }
    );
    this.RestaurantId = localStorage.getItem("restaurantIdforProfile");
    
    this.menucategoryList();
  }
  showSuccess() {
    this.toastr.success('','Menu Category Added', {
      timeOut: 3000,
      'progressBar': true,
    });
  }
  showError() {
    this.toastr.error('','Menu Category Not Added', {
      timeOut: 3000,
      'progressBar': true,
    });
  }

  onSubmit(){
    let body = {
      RestaurantID : this.RestaurantId,
      CategoryName : this.addMenuCategoryForm.controls['NameOfCategory'].value,
      
    }

    this.restaurantService.addMenuCategory(body).subscribe(
      data => {
        this.showSuccess();
        this.menucategoryList();
        
        this.restaurantService.getMenuCategoryList(this.RestaurantId);
        this.ngOnInit();
      },
      err => {
        this.showError();
      } 
    );
  }
  menucategoryList(){
    this.restaurantService.getMenuCategoryList(this.RestaurantId).subscribe(
      data => {
        this.menuCategoryList = data['data'];
        this.restaurantService.updateMenuCategoryList(this.menuCategoryList);
      },
      err => {
      } 
    );
  }
  canceled(){
    this.router.navigate(['/menu/menu-list']);
  }
}
