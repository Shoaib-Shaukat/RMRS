import { Component, DoCheck, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { animate, style, transition, trigger } from '@angular/animations';
import { GradientConfig } from '../../../../../app-config';
import { RestaurantService } from 'src/app/shared/services/restaurant.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class NavRightComponent implements OnInit, DoCheck {
  public visibleUserList: boolean;
  public chatMessage: boolean;
  public friendId: boolean;
  public gradientConfig: any;
  RestaurantID: string;
  resNotify: any;
  ownerNotify: any;
  OwnerId: string;
  check: boolean = false;
  description: any = "No Notification Found";
  private flag: boolean = false;
  // restaurantIdforProfile: any;
  constructor(private restaurantService: RestaurantService) {
    this.visibleUserList = false;
    this.chatMessage = false;
    this.gradientConfig = GradientConfig.config;
  }

  ngOnInit() {
   this.flag = true;
    this.OwnerId = localStorage.getItem("OwnerID");

    this.restaurantService.sendFlagFurhter.subscribe(
      x => {
        if (x) {
          this.getRestaurantNotification();
        }
        else {
          this.getOwnerNotification();
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.flag = false;
  }
  getRestaurantNotification() {
    this.RestaurantID = localStorage.getItem("restaurantIdforProfile");
    this.restaurantService.GetRestaurantNotification(this.RestaurantID).subscribe(
      data => {
        if (data['data'].description == this.description) {
          this.check = true;
          this.ownerNotify = data['data'];
        }
        else {
          this.check = false;
          this.ownerNotify = data['data'];
          this.restaurantService.updateOrderDetail(this.resNotify);
        }
      },
      err => {
      }
    );
    // setTimeout(() => {
    //   if(this.flag){
    //      this.getRestaurantNotification();
    //   }
    //  }, 2000);
  }

  getOwnerNotification() {

    this.restaurantService.GetOwnerNotification(this.OwnerId).subscribe(
      data => {
        if (data['data'].description == this.description) {
          this.check = true;
          this.ownerNotify = data['data'];
        }
        else {
          this.ownerNotify = data['data'];
          this.restaurantService.updateOrderDetail(this.ownerNotify);
        }
      },
      err => {
      }
    );
    // setTimeout(() => {
    //   if(this.flag){
    //      this.getOwnerNotification();
    //   }
    //  }, 2000);
  }

  onChatToggle(friendID) {
    this.friendId = friendID;
    this.chatMessage = !this.chatMessage;
  }

  ngDoCheck() {
    if (document.querySelector('body').classList.contains('elite-rtl')) {
      this.gradientConfig['rtl-layout'] = true;
    } else {
      this.gradientConfig['rtl-layout'] = false;
    }
  }
}
