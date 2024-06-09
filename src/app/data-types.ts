export interface SellerSignUp {
  name: string;
  email: string;
  password: string;
}

export interface SellerLogin {
  email: string;
  password: string;
}

export interface Product {
  name: string;
  price: string;
  category: string;
  color: string;
  description: string;
  image: string;
  id: number;
  quantity?: number;
  productId?: number;
}

export interface Cart {
  name: string;
  price: string;
  category: string;
  color: string;
  description: string;
  image: string;
  id?: number;
  quantity?: number;
  productId: number;
  userId: number;
}

export interface CostDetails {
  price: number;
  tax: number;
  delivery: number;
  discount: number;
  total: number;
}

export interface OrderNow {
  email: string;
  address: string;
  contact: string;
  totalPrice?: number;
  userId?: number;
  id?: number;
}
