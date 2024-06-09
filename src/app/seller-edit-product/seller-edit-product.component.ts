import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../data-types';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-edit-product',
  templateUrl: './seller-edit-product.component.html',
  styleUrls: ['./seller-edit-product.component.scss'],
})
export class SellerEditProductComponent implements OnInit {
  @ViewChild('editProductForm') editProductForm!: NgForm;
  currentProduct: Product;
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {
    this.currentProduct = this.productsService.productToEdit;
  }

  ngOnInit(): void {}

  editProduct(product: Product) {
    this.productsService
      .editProduct(this.currentProduct.id, product)
      .subscribe(() => {
        this.router.navigate(['seller-home']);
      });
  }
}
