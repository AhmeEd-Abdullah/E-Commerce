import { Product } from './../data-types';
import { ProductsService } from '../services/products.service';
import { Component, OnInit } from '@angular/core';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss'],
})
export class SellerHomeComponent implements OnInit {
  allProducts!: Product[];
  faTrash = faTrash;
  faEdit = faEdit;
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productsService.getProductsList().subscribe((res) => {
      this.allProducts = res;
    });
  }

  delete(id: number) {
    this.productsService.deleteProduct(id).subscribe((res) => {
      if (res) {
        this.getAllProducts();
      }
    });
  }

  shareProduct(item: Product) {
    this.productsService.productToEdit = item;
  }
}
