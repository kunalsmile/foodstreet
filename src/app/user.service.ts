import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { MessageService } from './message.service';
import { Customer } from 'src/models/customer';
import { geoCoder } from 'geocoder';
import { Address } from 'src/models/address';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private customerUrl = 'http://localhost:3000/customer';
  private loginUrl = 'http://localhost:3000/login';
  private addressUrl = 'http://localhost:3000/customeraddress';
  location = {
    lat: null,
    lon: null
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private httpModule: HttpClientModule
  ) { }

  addNewCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customerUrl, customer, httpOptions);
   }

  loginUser(userName: String, password: String): Observable<String> {
    return this.http.get<String>(this.loginUrl + '?userName=' + userName + '&pwd=' + password);
  }

  isLoggedIn() {
    return localStorage.getItem('user') != null;
  }

  getCustomerAddress(userKey: number): Observable<Address[]> {
    return this.http.get<Address[]>(this.addressUrl + '?userKey=' + userKey);
  }

  setLocation(lat, lon) {
    this.location.lat = lat;
    this.location.lon = lon;
  }
}
