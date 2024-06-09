import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Cart, CostDetails } from '../data-types';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  cartData!: Cart[];
  costSummary: CostDetails;
  constructor(private productService: ProductsService) {
    this.costSummary = {
      price: 0,
      tax: 0,
      delivery: 0,
      discount: 0,
      total: 0,
    };
  }

  ngOnInit(): void {
    this.loadDetails();
  }

  loadDetails() {
    let userData = JSON.parse(sessionStorage.getItem('user')!);
    if (userData) {
      this.productService.getUserCart(userData.id).subscribe((res) => {
        this.cartData = res;
        if (res.length) {
          let price = 0;
          res.forEach((item) => {
            price += +item.price! * item.quantity!;
            this.costSummary.tax += (+item.price / 10) * item.quantity!;
            this.costSummary.discount += +item.price * 0.05 * item.quantity!;
          });
          this.costSummary.price = price;
          this.costSummary.delivery = 50;
          this.costSummary.total = parseFloat(
            (
              price +
              this.costSummary.tax +
              this.costSummary.delivery -
              this.costSummary.discount
            ).toFixed(2)
          );
        } else {
          this.costSummary.price = 0;
          this.costSummary.tax = 0;
          this.costSummary.delivery = 0;
          this.costSummary.discount = 0;
          this.costSummary.total = 0;
        }
      });
    }
  }

  removeItem(id: number) {
    this.productService.removeToCartAfterLogin(id).subscribe(() => {
      let userId = JSON.parse(sessionStorage.getItem('user')!).id;
      this.productService.getRemoteCartList(userId);
      this.loadDetails();
    });
  }
}
