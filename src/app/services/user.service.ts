import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { SellerLogin, SellerSignUp } from '../data-types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  accountCreated: EventEmitter<boolean>;
  loginError: EventEmitter<boolean>;
  constructor(private http: HttpClient, private router: Router) {
    this.accountCreated = new EventEmitter(false);
    this.loginError = new EventEmitter(false);
  }

  userSignup(data: SellerSignUp) {
    return this.http
      .post('https://mock-database-v1i5.onrender.com/user', data)
      .subscribe(() => {
        this.accountCreated.emit(true);
      });
  }

  userLogin(data: SellerLogin) {
    return this.http
      .get(
        `https://mock-database-v1i5.onrender.com/user?email=${data.email}&password=${data.password}`
      )
      .subscribe((res: any) => {
        if (res.length) {
          sessionStorage.setItem('user', JSON.stringify(res[0]));
          this.router.navigate(['home']);
          this.loginError.emit(false);
        } else {
          this.loginError.emit(true);
        }
      });
  }

  userAuthReload() {
    if (sessionStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
