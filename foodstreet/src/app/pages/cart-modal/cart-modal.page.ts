import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ShoppingCart } from '../../models/shoppingCart';
import { OrderService } from '../../services/order.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { LocalStorageUtil } from '../../Utils/LocalStorageUtil';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {

  shoppingCart: ShoppingCart[];
  cartValue: number;
  constructor(public modalController: ModalController,
    public shoppingCartService: ShoppingCartService,
    public orderService: OrderService,
    public router: Router,
    public localStorageUtil: LocalStorageUtil) { }

  ngOnInit() {
    this.shoppingCart = [];
    this.cartValue = 0;
    this.getShoppingCart();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  placeOrder(): void {
    let customerKey = this.localStorageUtil.getUserId();
    this.orderService.placeOrder(customerKey).subscribe(o => {
      this.modalController.dismiss();
      this.router.navigateByUrl('/login');
    });
    
  }

  getShoppingCart() {
    let customerKey = this.localStorageUtil.getUserId();
    this.shoppingCartService.getCart(customerKey).subscribe(sc => {
      sc.forEach(element => {
        try {
          let cartItem: ShoppingCart;
          cartItem = {
            CustomerKey: element["customer_key"],
            ItemKey: element["item_key"],
            ItemName: element["item_name"],
            Price: element["price"],
            Quantity: element["quantity"],
            TotalPrice: Math.floor(element["quantity"]) * Math.floor(element["price"]),
            ShoppingCartKey: element["shopping_cart_key"]
          }
          this.cartValue += cartItem.TotalPrice;
          this.shoppingCart.push(cartItem);

        } catch (error) {
          console.log(error);
        }
      });
    });
  }
}
