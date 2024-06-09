import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../data-types';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  searchResults!: Product[];
  constructor(private activatedRoute: ActivatedRoute, private productsService: ProductsService) { }

  ngOnInit() {
    let searchPath = this.activatedRoute.snapshot.params['path'];
    this.productsService.searchResults(searchPath).subscribe((res) => {
      this.searchResults = res;
    })
  }

}
