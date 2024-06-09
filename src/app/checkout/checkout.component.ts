import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Cart, CostDetails, OrderNow } from '../data-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cartData!: Cart[];
  costSummary: CostDetails;
  orderMsg!: string;
  constructor(private productService: ProductsService, private router: Router) {
    this.costSummary = {
      price: 0,
      tax: 0,
      delivery: 0,
      discount: 0,
      total: 0,
    };
  }

  ngOnInit(): void {
    let userData = JSON.parse(sessionStorage.getItem('user')!);
    if (userData) {
      this.productService.getUserCart(userData.id).subscribe((res) => {
        if (res.length) {
          this.cartData = res;
          let price = 0;
          res.forEach((item) => {
            price += +item.price! * item.quantity!;
            this.costSummary.tax += (+item.price / 10) * item.quantity!;
            this.costSummary.discount += +item.price * 0.05 * item.quantity!;
          });
          this.costSummary.total = parseFloat(
            (
              price +
              this.costSummary.tax +
              50 -
              this.costSummary.discount
            ).toFixed(2)
          );
        }
      });
    }
  }

  orderNow(data: OrderNow) {
    let userId = JSON.parse(sessionStorage.getItem('user')!).id;
    let orderData: OrderNow = {
      ...data,
      totalPrice: this.costSummary.total,
      userId: userId,
    };

    this.cartData.forEach((item) => {
      setTimeout(() => {
        this.productService.deleteCartItems(item.id!);
      }, 500);
    });

    this.productService.orderNow(orderData).subscribe((res) => {
      if (res) {
        this.orderMsg = 'Order has been placed';
        setTimeout(() => {
          this.orderMsg = '';
          this.router.navigate(['/my-order']);
        }, 3000);
      }
    });
  }
}
