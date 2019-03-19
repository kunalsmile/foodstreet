import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ShoppingCart } from 'src/models/shoppingcart';
import { Order } from 'src/models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})

export class ShoppingcartComponent implements OnInit {
  displayedColumns: string[] = ['item', 'quantity', 'unitprice', 'price', 'add', 'remove'];
  shoppingCart: ShoppingCart[];
  order: Order;
  totalCost: number = 0;
  totalItems: number = 0;
  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    this.getCartItems();
  }

  getCartItems() {
    const customerKey = JSON.parse(localStorage.getItem('user'))['user_id'];
    this.orderService.getOrderByCustomer(customerKey).subscribe(crt => {
      this.shoppingCart = crt;
      localStorage.setItem('orderKey', crt[0].order_key.toString());
      this.getCartTotal();
    });
  }

  addToOrder(itemKeyToAdd: number): void {
      // this.order = {
      //   customerKey: 0,
      //   itemKey: 0,
      //   orderKey: 0
      // };
      const userId = JSON.parse(localStorage.getItem('user'))['user_id'];
      this.order = {
        customerKey: userId,
        itemKey: itemKeyToAdd,
        orderKey: 0,
        status: ''
      };
      this.orderService.addUpdateOrder(this.order).subscribe(o => this.order = o);
      // this.getCartItems();
      window.location.reload();
  }

  removeOrder(itemKeyToRemove: number): void {
    const orderKey = JSON.parse(localStorage.getItem('orderKey'));
    this.order = {
      customerKey: 0,
        itemKey: itemKeyToRemove,
        orderKey: orderKey,
        status: ''
    };
    this.orderService.removeUpdateOrder(this.order).subscribe(o => this.order = o);
    window.location.reload();
  }

  getCartTotal() {
   this.shoppingCart.forEach(element => {
     this.totalCost += Number(element.price);
     this.totalItems += Number(element.quantity);
   });
  }

  checkoutCart(statusValue: string) {
    const orderKey = JSON.parse(localStorage.getItem('orderKey'));
    this.order = {
        customerKey: 0,
        itemKey: 0,
        orderKey: orderKey,
        status: statusValue
    };
    this.orderService.updateCart(this.order).subscribe(o => this.order = o);
    if (statusValue === 'CLEAR') {
      window.location.reload();
    } else if (statusValue === 'ORDER_CONFIRMED') {
      this.router.navigate(['./customeraddress']);
    }
  }
}
