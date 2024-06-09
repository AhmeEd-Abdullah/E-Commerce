import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Cart, Product, SellerLogin, SellerSignUp } from '../data-types';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss'],
})
export class UserAuthComponent implements OnInit {
  wantToLogin: boolean;
  accountCreationMessage: string;
  loginErrorMessage: string;
  @ViewChild('userForm') userForm!: NgForm;
  constructor(
    private userService: UserService,
    private productService: ProductsService
  ) {
    this.wantToLogin = true;
    this.accountCreationMessage = '';
    this.loginErrorMessage = '';
  }

  ngOnInit(): void {
    this.userService.userAuthReload();
  }

  signUp(data: SellerSignUp) {
    this.userService.userSignup(data);
    this.userService.accountCreated.subscribe((value) => {
      if (value) {
        this.accountCreationMessage = `Your account created successfully`;
        this.userForm.reset();
        setTimeout(() => {
          this.accountCreationMessage = '';
        }, 3000);
      }
    });
  }

  login(data: SellerLogin) {
    this.userService.userLogin(data);
    this.userService.loginError.subscribe((value) => {
      if (value) {
        this.loginErrorMessage = `Email or Password is Wrong`;
        setTimeout(() => {
          this.loginErrorMessage = '';
        }, 3000);
      } else {
        this.sessionCartToRemoteCart();
      }
    });
  }

  sessionCartToRemoteCart() {
    let sessionCart: Product[] = JSON.parse(sessionStorage.getItem('cart')!);
    let userId = JSON.parse(sessionStorage.getItem('user')!)?.id;
    if (sessionCart) {
      sessionCart.forEach((product: Product, i: number) => {
        let remoteCart: Cart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete remoteCart.id;
        setTimeout(() => {
          this.productService
            .addToCartAfterLogin(remoteCart)
            .subscribe((res) => {
              if (i + 1 === sessionCart.length) {
                this.getDatabaseCarts(userId);
              }
            });
        }, 300);
      });
      sessionStorage.removeItem('cart');
    }
  }

  getDatabaseCarts(id: number) {
    if (sessionStorage.getItem('user')) {
      this.productService.getRemoteCartList(id);
    }
  }

  changeAuthStratigy() {
    this.wantToLogin = !this.wantToLogin;
  }
}
