import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { Constants } from "./Constants";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageUtil {
  
  setUserInfo(user: User) {
    localStorage.setItem(Constants.USER, JSON.stringify(user));
  }

  getUserId() {
    return JSON.parse(localStorage.getItem("USER"))["UserId"];
  }

  getUserName() {
    return JSON.parse(localStorage.getItem("USER"))["UserName"]
  }
}