import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItemsOne = {
  id: 'navigation',
  title: 'Navigation',
  type: 'group',
  icon: 'feather icon-monitor',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/analytics',
      icon: 'feather icon-home',
      breadcrumbs: false
    },
  ]
}

const NavigationItemsTwo = {
  id: 'restaurant-managment',
  title: 'Restaurant Managment',
  type: 'group',
  icon: 'feather icon-layers',
  children: [
    {
      id: 'restaurant',
      title: 'Restaurant',
      type: 'collapse',
      icon: 'feather icon-box',
      children: [
        {
          id: 'restaurant-list',
          title: 'List of restaurant',
          type: 'item',
          url: '/restaurant/restaurant-list',
        },
        {
          id: 'restaurant-add',
          title: 'Add Restaurant',
          type: 'item',
          url: '/restaurant/restaurant-add',
        }

      ]
    },
  ]
}
const NavigationItemsThree = {
  id: 'staff',
  title: 'Staff',
  type: 'collapse',
  icon: 'feather icon-users',
  children: [
    {
      id: 'staff-list',
      title: 'List of Staff',
      type: 'item',
      url: '/staff/staff-list',
    },
    {
      id: 'staff-add',
      title: 'Add Staff',
      type: 'item',
      url: '/staff/staff-add',
    }

  ]
}
const NavigationItemsFour = {
  id: 'menu',
  title: 'Menu',
  type: 'collapse',
  icon: 'feather icon-box',
  children: [
    {
      id: 'staff-list',
      title: 'List of items',
      type: 'item',
      url: '/menu/menu-list',
    },
    {
      id: 'menu-add',
      title: 'Add item',
      type: 'item',
      url: '/menu/menu-add',
    },
    {
      id: 'add-menu-category',
      title: 'Add menu category',
      type: 'item',
      url: '/menu/add-menu-category',
    },
    {
      id: 'deals',
      title: 'Add deals',
      type: 'item',
      url: '/menu/deals',
      breadcrumbs: true
    },
    {
      id: 'deals-list',
      title: 'List of Deals',
      type: 'item',
      url: '/menu/deals-list',
      breadcrumbs: true
    }

  ]
}
const NavigationItemsFive = {
  id: 'order',
  title: 'Order',
  type: 'collapse',
  icon: 'feather icon-box',
  children: [
    {
      id: 'order-list',
      title: 'List of Order',
      type: 'item',
      url: '/order/order-list',
    }
  ]
}
const NavigationItemsSix = {
  id: 'reservation',
  title: 'Reservation',
  type: 'collapse',
  icon: 'feather icon-box',
  children: [
    {
      id: 'reservation-list',
      title: 'List of reservation',
      type: 'item',
      url: '/reservation/reservation-list',
    },
    {
      id: 'reservation-add',
      title: 'Add reservation',
      type: 'item',
      url: '/reservation/reservation-add',
    }

  ]
}
const NavigationItemsSeven = {
  id: 'point-of-sale',
  title: 'Point of sale',
  type: 'group',
  icon: 'feather icon-layout',
  children: [
    {
      id: 'pos',
      title: 'POS',
      type: 'item',
      url: '/pos',
      icon: 'feather icon-file-text'
    },
  ]
}
const NavigationItemsEight = {
  id: 'reports',
  title: 'Reports',
  type: 'collapse',
  icon: 'feather icon-box',
  children: [
    {
      id: 'sales-report',
      title: 'Sales report',
      type: 'item',
      url: '/reports/sales-report',
    }
  ]
}
@Injectable()
export class NavigationItem {
  public get() {
    let arr1 = [];
    arr1.push(NavigationItemsOne, NavigationItemsTwo);
    return arr1;
  }
  public getTwo() {
    let arr2 = [];
    arr2.push(NavigationItemsOne, NavigationItemsTwo, NavigationItemsThree, NavigationItemsFour, NavigationItemsFive, NavigationItemsSix, NavigationItemsSeven, NavigationItemsEight);
    return arr2;
  }
}
