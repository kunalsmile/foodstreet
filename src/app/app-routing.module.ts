import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CategoryComponent } from './category/category.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { CustomeraddressComponent } from './customeraddress/customeraddress.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'items', component: ItemsComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'item/detail/:id', component: ItemDetailComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'cart', component: ShoppingcartComponent},
  {path: 'customeraddress', component: CustomeraddressComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

 }
