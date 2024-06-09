import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart, Product } from '../data-types';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  productId!: string;
  cartId!: number;
  productsQuantity: number;
  removeItemMessage: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService
  ) {
    this.productsQuantity = 1;
    this.removeItemMessage = false;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.productId = params['productId'];
      this.loadingProductsDetails(this.productId);
    });
  }

  loadingProductsDetails(productId: string) {
    this.productsService.getProduct(productId).subscribe((res) => {
      this.product = res;

      if (sessionStorage.getItem('cart')) {
        let items: Product[] = JSON.parse(sessionStorage.getItem('cart')!);
        let currentItem: Product[] = items.filter(
          (item: Product) => item.id.toString() == productId
        );
        if (currentItem.length) {
          this.removeItemMessage = true;
        } else {
          this.removeItemMessage = false;
        }
      } else if (sessionStorage.getItem('user')) {
        let userId = JSON.parse(sessionStorage.getItem('user')!).id;
        this.productsService.getRemoteCartList(userId);
        this.productsService.cartItems.subscribe((res) => {
          if (res) {
            let product = res.filter(
              (item: Product) => item.productId == +this.productId
            );
            if (product.length) {
              this.cartId = product[0].id;
              this.removeItemMessage = true;
            } else {
              this.removeItemMessage = false;
            }
          }
        });
      }
    });
  }

  handleQuantity(keyword: string) {
    if (this.productsQuantity > 1 && keyword === 'minus') {
      this.productsQuantity -= 1;
    } else if (this.productsQuantity < 20 && keyword === 'plus') {
      this.productsQuantity += 1;
    }
  }

  addToCart() {
    this.product.quantity = this.productsQuantity;
    if (!sessionStorage.getItem('user')) {
      this.productsService.addToCartWithoutLogin(this.product);
      this.removeItemMessage = true;
    } else {
      let userId = JSON.parse(sessionStorage.getItem('user')!).id;
      let cart: Cart = {
        ...this.product,
        productId: this.product.id,
        userId,
      };
      delete cart.id;
      this.productsService.addToCartAfterLogin(cart).subscribe((res) => {
        if (res) {
          this.productsService.getRemoteCartList(userId);
          this.removeItemMessage = true;
        }
      });
    }
  }

  removeToCart(id: number) {
    if (!sessionStorage.getItem('user')) {
      this.productsService.removeToCartWithoutLogin(id);
      this.removeItemMessage = false;
    } else {
      this.productsService.removeToCartAfterLogin(this.cartId).subscribe(() => {
        let userId = JSON.parse(sessionStorage.getItem('user')!).id;
        this.productsService.getRemoteCartList(userId);
      });
      this.removeItemMessage = false;
    }
  }
}
