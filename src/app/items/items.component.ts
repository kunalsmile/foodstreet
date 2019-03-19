import { Component, OnInit } from '@angular/core';
import { Item } from 'src/models/items';
import { ItemService } from '../item.service';
import { Order } from 'src/models/order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[];
  selectedItem: Item;
  order: Order;

  constructor(private itemService: ItemService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getItems()
    .subscribe(items => {
      this.items = items;
      this.items.forEach(function(currItem) {
        currItem.cols = 1;
        currItem.rows = 1;
      });
    });
  }

  getItemsByCategory(categoryId: number): void {
   this.itemService.getItemsByCategory(categoryId)
      .subscribe(items => {
        this.items = items;
        this.items.forEach(function(currItem) {
          currItem.cols = 1;
          currItem.rows = 1;
        });
        console.log(this.items);
      });
  }

  addToOrder(itemKeyToAdd: number): void {
    const userId = JSON.parse(localStorage.getItem('user'))['user_id'];
    this.order = {
      customerKey: userId,
      itemKey: itemKeyToAdd,
      orderKey: 0,
      status: ''
    };
    this.orderService.addUpdateOrder(this.order).subscribe(o => this.order = o);
  }
}
