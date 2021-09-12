import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Menu } from '../models/menu';
import { Category } from '../models/category';
import { Constants } from '../Utils/Constants';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MenuService {
private menuItemsURL = `${Constants.API_URL}/items`;
private categoriesURL = `${Constants.API_URL}/categories`;
private menuItemByCategory = `${Constants.API_URL}/itemByCategory`;
private menuItemByCategories = `${Constants.API_URL}/itemByCategories`;

  constructor(private http: HttpClient, private httpModule: HttpClientModule) { }

  getMenuItems(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.menuItemsURL);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesURL);
  }

  getMenuItemByCategory(categoryKey: number): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.menuItemByCategory}?categoryKey=${categoryKey}`);
  }

  getMenuItemByCategories(categoryKey: string): Observable<Menu[]> {
    console.log(categoryKey);
    return this.http.get<Menu[]>(`${this.menuItemByCategories}?categoryKeys=${categoryKey}`);
  }
}
