import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userName = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private router: Router) {
      this.loginForm = this.formBuilder.group({
        userName: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
     }

  ngOnInit() {
  }

  getUserNameErrorMessage() {
    return this.userName.hasError('required') ? 'Enter user name' :
            '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Enter password' :
            '';
  }

  onSubmit() {
    const userName = this.userName.value;
    const password = this.password.value;
    
    let userId = '';
    // if (!this.loginForm.valid) {
    //   return;
    // }
    this.userService.loginUser(userName, password).subscribe(lo => {
      if (lo != null) {
        // userId = lo.user_id;
        // lo.password = '';
        localStorage.setItem('user', JSON.stringify(lo));
        this.router.navigate(['./items']);
      } else {
        alert('User name and password does not match.');
      }
    });
  }
}
