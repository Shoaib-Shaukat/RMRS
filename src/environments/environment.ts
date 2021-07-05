// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyDSfCLHPI9mnw1Yxx4TR1fvYdLfUErDSzI',
    authDomain: 'rmrs-customer.firebaseapp.com',
   // databaseURL: '<your-database-URL>',
    projectId: 'rmrs-customer',
    storageBucket: 'rmrs-customer.appspot.com',
    messagingSenderId: '519994687640',
    appId: '1:519994687640:web:a93a63cbc988d9911050ed',
    measurementId: 'G-F2V0R9KDCQ',
  },
  // apiUrl: 'https://rest-be.k8s.teletaleem.com',
  // apiUrl: 'https://rest-be.k8s.symcloud.net',
   apiUrl: 'https://restaurant.teletaleem.com',
  // apiUrl: 'https://rest-be-1.teletaleem.com',
  httpOptions: {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // 'x-app-name': 'auth',
      // 'x-org-name': 'cloud',
    })
  }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
