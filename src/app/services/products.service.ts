import { EventEmitter, Injectable } from '@angular/core';
import { Cart, OrderNow, Product } from '../data-types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  productToEdit!: Product;
  cartItems: EventEmitter<Product[] | []>;
  constructor(private http: HttpClient) {
    this.cartItems = new EventEmitter<Product[] | []>();
  }

  addProduct(data: Product) {
    return this.http.post(
      'https://mock-database-v1i5.onrender.com/products',
      data
    );
  }

  getProduct(id: string) {
    return this.http.get<Product>(
      `https://mock-database-v1i5.onrender.com/products/${id}`
    );
  }

  getProductsList() {
    return this.http.get<Product[]>(
      'https://mock-database-v1i5.onrender.com/products'
    );
  }

  deleteProduct(id: number) {
    return this.http.delete(
      `https://mock-database-v1i5.onrender.com/products/${id}`
    );
  }

  editProduct(id: number, body: Product) {
    return this.http.put(
      `https://mock-database-v1i5.onrender.com/products/${id}`,
      body
    );
  }

  trendyProducts() {
    return this.http.get<Product[]>(
      'https://mock-database-v1i5.onrender.com/products?_limit=3'
    );
  }

  popularProducts() {
    return this.http.get<Product[]>(
      'https://mock-database-v1i5.onrender.com/products?_limit=8'
    );
  }

  searchResults(query: string) {
    return this.http.get<Product[]>(
      `https://mock-database-v1i5.onrender.com/products?q=${query}`
    );
  }

  addToCartWithoutLogin(data: Product) {
    let currentCart = sessionStorage.getItem('cart');
    let newCart: Product[] = [];
    if (!currentCart) {
      sessionStorage.setItem('cart', JSON.stringify([data]));
    } else {
      newCart = JSON.parse(currentCart);
      newCart.push(data);
      sessionStorage.setItem('cart', JSON.stringify(newCart));
    }
    this.cartItems.emit(JSON.parse(sessionStorage.getItem('cart')!));
  }

  addToCartAfterLogin(data: Cart) {
    return this.http.post(
      'https://mock-database-v1i5.onrender.com/carts',
      data
    );
  }

  getRemoteCartList(userId: number) {
    return this.http
      .get<Product[]>('https://mock-database-v1i5.onrender.com/carts', {
        params: { userId: userId },
      })
      .subscribe((res) => {
        this.cartItems.emit(res);
      });
  }

  removeToCartWithoutLogin(id: number) {
    let currentCart: Product[] = JSON.parse(sessionStorage.getItem('cart')!);
    let newCart: Product[] = currentCart.filter(
      (item: Product) => item.id !== id
    );
    sessionStorage.setItem('cart', JSON.stringify(newCart));
    this.cartItems.emit(newCart);
  }

  removeToCartAfterLogin(id: number) {
    return this.http.delete(
      `https://mock-database-v1i5.onrender.com/carts/${id}`
    );
  }

  getUserCart(userId: number) {
    return this.http.get<Cart[]>(
      `https://mock-database-v1i5.onrender.com/carts`,
      {
        params: { userId: userId },
      }
    );
  }

  orderNow(data: OrderNow) {
    return this.http.post(
      `https://mock-database-v1i5.onrender.com/orders`,
      data
    );
  }

  orderList() {
    let userId = JSON.parse(sessionStorage.getItem('user')!).id;
    return this.http.get<OrderNow[]>(
      `https://mock-database-v1i5.onrender.com/orders?userId=${userId}`
    );
  }

  deleteCartItems(cartId: number) {
    return this.http
      .delete(`https://mock-database-v1i5.onrender.com/carts/${cartId}`)
      .subscribe((_) => {
        this.cartItems.emit([]);
      });
  }

  cancleOrder(orderId: number) {
    return this.http.delete(
      `https://mock-database-v1i5.onrender.com/orders/${orderId}`
    );
  }
}
