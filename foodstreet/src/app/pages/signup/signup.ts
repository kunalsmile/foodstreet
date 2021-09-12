import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { Customer, SignUpForm } from '../../models/customer';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  // signup: UserOptions = { username: '', password: '', name: '',  };
  signup: SignUpForm = {Email: '', FirstName: '', LastName: '', Mobile: '', Password:'', UserName: '' };
  submitted = false;

  constructor(
    public router: Router,
    public userData: UserData,
    public userService: UserService
  ) {}

  onSignup(form: NgForm) {
    this.submitted = true;
    
    if (form.valid) {
      this.userService.signUp(this.signup).subscribe(su => {
        console.log(su);
      })
    }
  }
}
