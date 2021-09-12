import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shoppingCart';
import { Constants } from '../Utils/Constants';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCartURL = `${Constants.API_URL}/cart`;

  constructor(private http: HttpClient) { }
  
  saveCart(shoppingCart: ShoppingCart): Observable<ShoppingCart> {
    return this.http.post<ShoppingCart>(`${this.shoppingCartURL}/saveCart`, shoppingCart, httpOptions);
  }

  getCart(customerKey: number): Observable<ShoppingCart[]> {
    return this.http.get<ShoppingCart[]>(`${this.shoppingCartURL}/getCart?customerKey=${customerKey}`);
  }
}
