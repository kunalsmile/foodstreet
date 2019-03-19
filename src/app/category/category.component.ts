import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Category } from 'src/models/category';
import { Item } from 'src/models/items';
import { Order } from 'src/models/order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[];
  items: Item[];
  order: Order;
  step = 0;
  constructor(private itemService: ItemService,
    private orderService: OrderService) { }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.itemService.getCategories()
      // .subscribe(ctg => console.log(ctg));
      .subscribe(ctg => this.categories = ctg);
  }

  getItemsByCategory(categoryId: number): void {
    this.itemService.getItemsByCategory(categoryId)
      .subscribe(items => this.items = items);
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
