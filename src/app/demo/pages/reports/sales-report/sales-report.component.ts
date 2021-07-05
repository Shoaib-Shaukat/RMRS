import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  min: number;
  max: number;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  serachDateSalesForm: FormGroup;
  isTodayOrNot: boolean = false;
  RestaurantID: any;
  SalesReport: any;
  Description: any;
  TotalOfSalesReport: any = {};
  ReportsAvailable: boolean = false;
  RestaurantName: any;
  GST: any;
  GrosswithGST: any;
  transaction: any;
  constructor(private formBuilder: FormBuilder, private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.serachDateSalesForm = this.formBuilder.group({
      StartDate: new FormControl('', [
        Validators.required]),
      EndDate: new FormControl('', [
        Validators.required])
    }
    );
    this.isTodayOrNot = false;
    this.ReportsAvailable = false;
    this.RestaurantID = localStorage.getItem("restaurantIdforProfile");

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      order: [1, 'desc'],
      processing: true,
      dom: 'Bfrtip',
      lengthMenu: [10, 20, 50, 100],
      buttons: [
        'print', 'csv', 'pageLength'
      ]
    };
  

  }
  isToday(event: any) {
    this.serachDateSalesForm.reset();
    if (event.target.checked) {
      this.isTodayOrNot = true;
    }
    else {
      this.isTodayOrNot = false;
    }

  }
  searchReport() {
    let body = {
      RestaurantID: this.RestaurantID,
      StartDate: this.serachDateSalesForm.controls['StartDate'].value,
      EndDate: this.serachDateSalesForm.controls['EndDate'].value,
      isToday: this.isTodayOrNot
    }
    this.restaurantService.searchReports(body).subscribe(
      data => {
        if (data['Message'] == "Success"){
          this.ReportsAvailable = true;
          this.TotalOfSalesReport = data['data'];
          this.transaction = this.TotalOfSalesReport.transactions;
          this.TotalOfSalesReport.gst = Math.round(this.TotalOfSalesReport.gst);
          this.GST = this.TotalOfSalesReport.gst
          this.TotalOfSalesReport.grossWithGST = Math.round(this.TotalOfSalesReport.grossWithGST);
          this.GrosswithGST = this.TotalOfSalesReport.grossWithGST
          this.SalesReport = data['data'].report;
          this.SalesReport.reverse();
          this.RestaurantName = data['data'].report[0].RestaurantName;
          this.Description = "";
        }
        if (data['Message'] == "Failure") {
          this.ReportsAvailable = false;
          this.Description = data['data'].description;
        }
      
      },
      
      err => {
      }
    );
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    $.fn['dataTable'].ext.search.pop();

  }

}
