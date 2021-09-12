export class Customer {
  CustomerKey: number;
  UserKey: number;
  FirstName: String;
  LastName: String;
  Mobile: String;
  Address1: String;
  Address2: String;
  City: String;
  Pincode: String;
  AlternateNumer: String
  Email: String;
  
  IsAdmin: Boolean;
  IsEmailVerified: Boolean;
  IsMobileVerified: Boolean;
  
  UserName: String;
  Password: String;
  IsActive: boolean;
  RoleKey: number;
}

export class SignUpForm {
  FirstName: String;
  LastName: String;
  Mobile: String;
  Password: String;
  Email: String;
  UserName: String;
}