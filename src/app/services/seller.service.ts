import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { SellerLogin, SellerSignUp } from '../data-types';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  accountCreated: EventEmitter<boolean>;
  loginError: EventEmitter<boolean>;
  isSellerLogedin: BehaviorSubject<boolean>;
  constructor(private http: HttpClient, private router: Router) {
    this.accountCreated = new EventEmitter(false);
    this.loginError = new EventEmitter(false);
    this.isSellerLogedin = new BehaviorSubject<boolean>(false);
  }

  SellerSignup(data: SellerSignUp) {
    return this.http
      .post('https://mock-database-v1i5.onrender.com/seller', data)
      .subscribe((_) => {
        this.accountCreated.emit(true);
      });
  }

  SellerLogin(data: SellerLogin) {
    this.http
      .get(
        `https://mock-database-v1i5.onrender.com/seller?email=${data.email}&password=${data.password}`
      )
      .subscribe((res: any) => {
        if (res.length) {
          sessionStorage.setItem('seller', JSON.stringify(res[0]));
          this.loginError.emit(false);
          this.isSellerLogedin.next(true);
          this.router.navigate(['seller-home']);
        } else {
          this.loginError.emit(true);
        }
      });
  }

  reloadSellerAuth() {
    if (sessionStorage.getItem('seller')) {
      this.isSellerLogedin.next(true);
      this.router.navigate(['seller-home']);
    }
  }
}
