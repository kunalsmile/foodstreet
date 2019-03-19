import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatMenuModule, MatToolbarModule,
        MatCardModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule, MatFormFieldModule, MatInputModule, MatExpansionModule,
        MatGridListModule, MatProgressSpinnerModule, MatSnackBarModule, MatTableModule} from '@angular/material';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { CategoryComponent } from './category/category.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { CustomeraddressComponent } from './customeraddress/customeraddress.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatExpansionModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule
  ],
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemDetailComponent,
    MessagesComponent,
    DashboardComponent,
    SignupComponent,
    MenuComponent,
    LoginComponent,
    CategoryComponent,
    ShoppingcartComponent,
    CustomeraddressComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    MatMenuModule
  ]
})
export class AppModule { }
