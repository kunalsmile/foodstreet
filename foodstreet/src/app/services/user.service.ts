import { HttpHeaders, HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, SignUpForm } from '../models/customer';
import { Constants } from '../Utils/Constants';
// import * as CryptoJS from 'crypto-js';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loginUrl = `${Constants.API_URL}/user`;
  private signUpUrl = `${Constants.API_URL}/user/signUp`;
  constructor(private http: HttpClient) { }

  loginUser(userName: String, password: String): Observable<String> {
    return this.http.get<String>(`${this.loginUrl}?userName=${userName}&password=${password}`);
  }

  signUp(customer: SignUpForm): Observable<String> {
    // this.set('123456$#@$^@1ERF', 'password@123456');
    return this.http.post<String>(`${this.signUpUrl}`, customer, httpOptions);
  }

//   set(keys, value){
//     var key = CryptoJS.enc.Utf8.parse(keys);
//     var iv = CryptoJS.enc.Utf8.parse(keys);
//     var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
//     {
//         keySize: 128 / 8,
//         iv: iv,
//         mode: CryptoJS.mode.CBC,
//         padding: CryptoJS.pad.Pkcs7
//     });
// console.log(encrypted.toString());
//     return encrypted.toString();
//   }

//   get(keys, value){
//     var key = CryptoJS.enc.Utf8.parse(keys);
//     var iv = CryptoJS.enc.Utf8.parse(keys);
//     var decrypted = CryptoJS.AES.decrypt(value, key, {
//         keySize: 128 / 8,
//         iv: iv,
//         mode: CryptoJS.mode.CBC,
//         padding: CryptoJS.pad.Pkcs7
//     });

//     return decrypted.toString(CryptoJS.enc.Utf8);
//   }
}