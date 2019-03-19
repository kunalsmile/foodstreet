import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Order } from 'src/models/order';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/models/shoppingcart';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  private orderUrl = 'http://localhost:3000/order';
  private cartUrl = 'http://localhost:3000/cart';
  private updateCartUrl = 'http://localhost:3000/updatecart';

  constructor(
    private http: HttpClient,
    private httpModule: HttpClientModule) { }

  addUpdateOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.orderUrl, order, httpOptions);
  }

  getOrderByCustomer(customerKey: number): Observable<ShoppingCart[]> {
    return this.http.get<ShoppingCart[]>(this.cartUrl + '?customerKey=' + customerKey);
  }

  removeUpdateOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.cartUrl, order, httpOptions);
  }

  updateCart(order: Order): Observable<Order> {
    return this.http.post<Order>(this.updateCartUrl, order, httpOptions);
  }
}
