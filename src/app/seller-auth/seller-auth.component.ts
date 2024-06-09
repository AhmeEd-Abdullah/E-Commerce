import { Component, OnInit, ViewChild } from '@angular/core';
import { SellerLogin, SellerSignUp } from '../data-types';
import { SellerService } from '../services/seller.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss'],
})
export class SellerAuthComponent implements OnInit {
  wantToLogin: boolean;
  accountCreationMessage: string;
  loginErrorMessage: string;
  @ViewChild('sellerForm') sellerForm!: NgForm;
  constructor(private seller: SellerService) {
    this.wantToLogin = true;
    this.accountCreationMessage = '';
    this.loginErrorMessage = '';
  }

  ngOnInit(): void {
    this.seller.reloadSellerAuth();
  }

  signUp(data: SellerSignUp): void {
    this.seller.SellerSignup(data);
    this.seller.accountCreated.subscribe((value) => {
      if (value) {
        this.accountCreationMessage = `Your account created successfully`;
        this.sellerForm.reset();
        setTimeout(() => {
          this.accountCreationMessage = '';
        }, 3000);
      }
    });
  }

  login(data: SellerLogin) {
    this.seller.SellerLogin(data);
    this.seller.loginError.subscribe((value) => {
      if (value) {
        this.loginErrorMessage = `Email or Password is Wrong`;
        setTimeout(() => {
          this.loginErrorMessage = '';
        }, 3000);
      }
    });
  }

  changeAuthStratigy() {
    this.wantToLogin = !this.wantToLogin;
  }
}
