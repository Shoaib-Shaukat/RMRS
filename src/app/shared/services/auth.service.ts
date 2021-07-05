import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private http: HttpClient) { }
  AuthService_Login(body: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/owner/login', body);
  }
  StaffService_Login(body: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/staff/login', body);
  }
  // public getToken() {
  //   return localStorage.getItem('accessToken');
  // }

  // ProfileService(CustomerID: any): Observable<any>{
  //   return this.http.post(environment.apiUrl + '/owner/profile',{CustomerID}
  //   , environment.httpOptions);
  // }
  
   
}