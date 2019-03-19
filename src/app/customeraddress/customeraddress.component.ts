import { Component, OnInit } from '@angular/core';
import { Address } from 'src/models/address';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-customeraddress',
  templateUrl: './customeraddress.component.html',
  styleUrls: ['./customeraddress.component.css']
})
export class CustomeraddressComponent implements OnInit {
  addressForm: FormGroup;
  addresses: Address[];
  addressCount: Number;
  address: Address;

  houseNumber = new FormControl('', [Validators.required]);
  address1 = new FormControl('', [Validators.required]);
  buildingName = new FormControl('', [Validators.required]);
  city = new FormControl('', [Validators.required]);
  address2 = new FormControl();
  pincode = new FormControl();

  constructor(private userService: UserService, private router: Router,
    private formBuilder: FormBuilder) {
      this.addressForm = this.formBuilder.group({
        houseNumber: ['', Validators.required],
        address1: ['', Validators.required],
        buildingName: ['', Validators.required],
        city: ['', Validators.required]
      });

      this.address = new Address();
     }

  ngOnInit() {
    this.getAddress();
  }

  getHouseNumberErrorMessage() {
    return this.houseNumber.hasError('required') ? 'You must enter a value' :
            '';
  }

  getAddressErrorMessage() {
    return this.address1.hasError('required') ? 'You must enter a value' :
            '';
  }

  getBuildingNameErrorMessage() {
    return this.buildingName.hasError('required') ? 'You must enter a value' :
            '';
  }

  getCityErrorMessage() {
    return this.city.hasError('required') ? 'You must enter a value' :
            '';
  }

  getAddress(): void {
    const userId = JSON.parse(localStorage.getItem('user'))['user_id'];
    this.userService.getCustomerAddress(userId).subscribe(add => {
      this.addresses = add;
      this.addressCount = this.addresses.length;

      this.address = this.addresses[0];
    });
  }

  goToLogin() {
    this.router.navigate(['./login']);
  }

  onSubmit(): void {

  }
}
