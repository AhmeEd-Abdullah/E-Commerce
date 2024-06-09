import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { OrderNow } from '../data-types';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent implements OnInit {
  orderData!: OrderNow[];
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.getOrderList();
  }

  getOrderList() {
    this.productService.orderList().subscribe((res) => {
      this.orderData = res;
    });
  }

  cancleOrder(orderId: number) {
    this.productService.cancleOrder(orderId).subscribe((res) => {
      this.getOrderList();
    });
  }
}
