import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { UserOptions } from '../../interfaces/user-options';
import { User } from '../../models/user';

import { UserService } from '../../services/user.service';
import { Constants } from '../../Utils/Constants';
import { LocalStorageUtil } from '../../Utils/LocalStorageUtil';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public router: Router,
    public userService: UserService,
    public localStorageUtil: LocalStorageUtil,
    public toastController: ToastController
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;
    
    if (form.valid) {
      this.userService.loginUser(this.login.username, this.login.password).subscribe(o => {
        if(o["Status"]) {
          console.log(o["Status"]);
          if(o["Status"] == Constants.USER_NOT_FOUND) {
            this.handleButtonClick();
          }
        } else {
          let user: User = {
            UserId: o[0]["user_id"],
            UserName: o[0]["user_name"]
          }
          
          this.localStorageUtil.setUserInfo(user);
          this.router.navigateByUrl('/menu');
        }
      });
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  async handleButtonClick(){
    let toast = await this.toastController.create({
      message: "User Id and password does not match.",
      duration: 3000
    });
    return await toast.present();
  }
}
