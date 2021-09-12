import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Constants } from '../Utils/Constants';
import { Menu } from '../models/menu';

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
  private getOrderByStatusURL = `${Constants.API_URL}/order/getOrderByStatus`;

  constructor(private http: HttpClient) { }

  placeOrder(customerKey: number): Observable<String> {
    return this.http.get<String>(`${this.saveOrderURL}?customerKey=${customerKey}`);
  }

  getOrderByStatus(customerKey: number, status: string): Observable<Menu> {
    return this.http.get<Menu>(`${this.getOrderByStatusURL}?customerKey=${customerKey}&status=${status}`);
  } 
}
