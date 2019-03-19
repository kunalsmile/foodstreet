import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { UserService } from '../user.service';
import { Customer } from 'src/models/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  customer: Customer;
  location: Location;
  
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  mobile = new FormControl('', [Validators.required]);
  result = '';
  
  constructor(private formBuilder: FormBuilder, private userService: UserService,
     private router: Router) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobil: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' :
            '';
  }

  getPasswordErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' :
            '';
  }

  getMobileErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' :
            '';
  }

  onSubmit() {
    this.submitted = true;
    this.customer = {
      id: '',
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
      mobile: this.mobile.value,
      isAdmin: false,
      isEmailVerified: false,
      isMobileVerified: false,
      userName: this.email.value
    };
    // this.userService.addNewCustomer(this.customer).subscribe(cust => result = cust);
    this.userService.addNewCustomer(this.customer).subscribe(cust => {
      this.result = cust[0].status;
      if (this.result === 'USERCREATED') {
        this.router.navigate(['./login']);
      } else if (this.result === 'USEREXISTS') {
        alert('Email address already registered.');
      }
    });
  }

  goToLogin() {
    this.router.navigate(['./login']);
  }
}


