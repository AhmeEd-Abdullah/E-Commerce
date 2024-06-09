import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../data-types';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss'],
})
export class SellerAddProductComponent implements OnInit {
  @ViewChild('productForm') productForm!: NgForm;
  addProductMessage!: string;
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {}

  addProduct(data: Product): void {
    if (this.productForm.valid) {
      this.productsService.addProduct(data).subscribe((res) => {
        this.addProductMessage = 'Product Added Successfully';
        this.productForm.reset();
        setTimeout(() => {
          this.addProductMessage = '';
        }, 3000);
      });
    }
  }
}
