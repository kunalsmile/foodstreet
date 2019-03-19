import { Injectable } from '@angular/core';
import { Item } from '../models/items';
import { Category } from '../models/category';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})



export class ItemService {

  private itemsUrl = 'http://localhost:3000/item';
  private itemUrl = 'http://localhost:3000/item/';
  private categoryUrl = 'http://localhost:3000/category';
  private catItemUrl = 'http://localhost:3000/catitem?categoryId=';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private httpModule: HttpClientModule
    ) { }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl);
  }

  getItem(_id: string): Observable<Item> {
    this.messageService.add(`ItemService: fetched item: id=${_id}`);
    return this.http.get<Item>(`${this.itemUrl}${_id}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl);
  }

  getItemsByCategory(categoryKey: number): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.catItemUrl}${categoryKey}`);
  }

  private log(message: string) {
    this.messageService.add(message);
  }
}
