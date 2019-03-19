import { Component, OnInit } from '@angular/core';
import { Item } from 'src/models/items';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items: Item[];
  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getItems();
  }

  // getItems(): void {
  //   this.itemService.getItems()
  //     .subscribe(items => this.items = items.slice(1, 5));
  // }

  getItems(): void {
    this.itemService.getItems()
      .subscribe(items => this.items = items.slice(0, 5));
  }
}
