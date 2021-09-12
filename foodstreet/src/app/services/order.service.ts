import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Constants } from '../Utils/Constants';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private saveOrderURL = `${Constants.API_URL}/order/saveOrder`;
  constructor(private http: HttpClient) { }

  placeOrder(customerKey: number): Observable<String> {
    return this.http.get<String>(`${this.saveOrderURL}?customerKey=${customerKey}`);
  }
}
