import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../data-types';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  menuType: string;
  sellerName!: string;
  userName!: string;
  searchResults!: Product[];
  itemsCount: number;
  constructor(
    private router: Router,
    private productsService: ProductsService
  ) {
    this.menuType = 'default';
    this.itemsCount = 0;
  }

  ngOnInit(): void {
    this.navbarControl();
  }

  navbarControl() {
    // Menu Types Handling
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (sessionStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerData = sessionStorage.getItem('seller');
          this.sellerName = JSON.parse(sellerData!).name;
          this.menuType = 'seller';
        } else if (sessionStorage.getItem('user')) {
          let userData = JSON.parse(sessionStorage.getItem('user')!);
          this.userName = userData.name;
          this.menuType = 'user';
          this.productsService.getRemoteCartList(userData.id);
        } else {
          this.menuType = 'default';
        }
      }
    });
    // Check Count Of Cart Items
    if (sessionStorage.getItem('cart')) {
      this.itemsCount = JSON.parse(sessionStorage.getItem('cart')!).length;
    }
    this.productsService.cartItems.subscribe((val) => {
      this.itemsCount = val.length;
    });
  }

  userLogout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['user-auth']);
    this.productsService.cartItems.emit([]);
  }

  sellerLogout() {
    sessionStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

  typingSearch(keyword: string) {
    if (keyword) {
      this.productsService.searchResults(keyword).subscribe((res) => {
        if (res.length) {
          this.searchResults = res;
          if (res.length > 5) {
            this.searchResults.length = 5;
          }
        } else this.searchResults = [];
      });
    } else this.searchResults = [];
  }

  searchProducts(keyword: string) {
    this.router.navigate([`search/${keyword}`]);
  }

  hideSearchResults() {
    this.searchResults = [];
  }

  redirectToDetails(id: any) {
    this.router.navigate([`details/${id}`]);
  }
}
