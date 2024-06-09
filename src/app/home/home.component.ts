import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../data-types';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig],
})
export class HomeComponent implements OnInit {
  trendyProducts!: Product[];
  popularProducts!: Product[];
  constructor(
    config: NgbCarouselConfig,
    private productService: ProductsService
  ) {
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {
    this.getTrendyProducts();
    this.getPopularProducts();
  }

  getTrendyProducts() {
    this.productService.trendyProducts().subscribe((res) => {
      this.trendyProducts = res;
    });
  }

  getPopularProducts() {
    this.productService.popularProducts().subscribe((res) => {
      this.popularProducts = res;
    });
  }
}
