import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Menu } from '../../models/menu';
import { Category } from '../../models/category';
import { ShoppingCart } from '../../models/shoppingCart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ModalController, ToastController } from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { LocalStorageUtil } from '../../Utils/LocalStorageUtil';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  menuItems: Menu[];
  categoryFilterKeys: number[];
  categories: Category[];
  shoppingCart: ShoppingCart[];
  totalQuantity: number = 0;
  cartValue: number = 0;

  constructor(private menuService: MenuService, 
    private shoppingCartService: ShoppingCartService,
    private modalController: ModalController,
    private toastController: ToastController,
    private localStorageUtil: LocalStorageUtil) { }

  ngOnInit() {
    this.categoryFilterKeys = [];
    this.shoppingCart = [];
    this.menuItems = [];
    this.categories = [];
    
    this.getMenuItems();
    this.getCategories();
    this.getShoppingCart();
  }

  getMenuItems(): void {
    this.menuService.getMenuItems().subscribe(m => {
      m.forEach(element => {
        let menu: Menu;
        menu = {
          Quantity: 0,
          CategoryKey: element["category_key"],
          ItemKey: element["item_id"],
          ItemName: element["item_name"],
          Price: element["price"],
          IsAvailable: element["is_available"]
        }
        this.menuItems.push(menu);
      });
    });
  }

  getCategories() : void {
    this.categories = [];
    this.menuService.getCategories().subscribe(c => {
      c.forEach(element => {
        let category : Category;
        category = {
          CategoryKey: element["category_key"],
          CategoryName: element["category_name"]
        }
        this.categories.push(category);
      });
    });
  }

  getItemsByCategory(categoryKey: number) {
    const indexCategoryKey = this.categoryFilterKeys.indexOf(categoryKey);
    if(indexCategoryKey ==  -1) {
      this.categoryFilterKeys.push(categoryKey);
    } else {
      this.categoryFilterKeys.splice(indexCategoryKey, 1)
    }
    this.menuItems = [];
    this.menuService.getMenuItemByCategories(this.categoryFilterKeys.toString()).subscribe(m => {
      m.forEach(element => {
        let menu: Menu;
        menu = {
          Quantity: 0,
          CategoryKey: element["category_key"],
          ItemKey: element["item_id"],
          ItemName: element["item_name"],
          Price: element["price"],
          IsAvailable: element["is_available"]
        }
        this.menuItems.push(menu);
      });
    });
  }

  increaseQuantity(menuItem: Menu) : void {
    console.log(menuItem);
    menuItem.Quantity = menuItem.Quantity + 1;
    this.totalQuantity = this.totalQuantity + 1;
    this.cartValue = Math.floor(this.cartValue) + Math.floor(menuItem.Price);
    this.saveCart(menuItem, "+");
  }

  decreaseQuantity(menuItem: Menu) : void {
    if (menuItem.Quantity == 0) {
      return;
    }
    menuItem.Quantity = menuItem.Quantity - 1;
    this.totalQuantity = this.totalQuantity - 1;
    this.cartValue = Math.floor(this.cartValue) - Math.floor(menuItem.Price);
    this.saveCart(menuItem, "-");
  }

  saveCart(menuItem: Menu, input: string): void {
    let itemCart: ShoppingCart;
    itemCart = {
      ShoppingCartKey: 0,
      CustomerKey: this.localStorageUtil.getUserId(),
      ItemKey: menuItem.ItemKey,
      Quantity: menuItem.Quantity,
      ItemName: menuItem.ItemName,
      Price: 0,
      TotalPrice: 0

    }
    this.shoppingCartService.saveCart(itemCart).subscribe(sc => {
      this.handleButtonClick(input);
      this.shoppingCart.push(itemCart);
    });
  }

  async showCartModal() {
    const modal = await this.modalController.create({
      component: CartModalPage
    });
    return await modal.present();
  }

  getShoppingCart() {
    let customerKey = this.localStorageUtil.getUserId();
    this.shoppingCartService.getCart(customerKey).subscribe(sc => {
      this.shoppingCart = sc;
      this.shoppingCart.forEach(element => {
        element.TotalPrice = Math.floor(element["quantity"]) * Math.floor(element["price"]);
        this.cartValue += element.TotalPrice; 
        this.totalQuantity += element["quantity"];
      });
      
      this.menuItems.forEach(element => {
        let cartItem = this.shoppingCart.find(e => e["item_key"] == element.ItemKey);
        if(cartItem) {
          element.Quantity = cartItem["quantity"];
        }
      });
    })
  }

  async handleButtonClick(input: string){
    let message = "";
    if(input == "+") {
      message = "Item added to cart"
    } else if (input == "-") {
      message = "Item removed from cart"
    }
    let toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    return await toast.present();
  }
}
