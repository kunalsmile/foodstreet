import { Component, OnInit } from '@angular/core';
import { Menu } from '../../models/menu';
import {} from '../../services/order.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage implements OnInit {
  menuItems: Menu[];
  constructor() { }

  ngOnInit() {
  }

}
