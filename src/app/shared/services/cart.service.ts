import { Injectable } from '@angular/core';
import { ProductService } from '@shared/services/product.service';
import { Product } from '@model/product';
import { CartItem } from '@model/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private products: Product[] = [];
  private cart: CartItem[] = [];

  constructor(private productService: ProductService) {
    this.productService.products$.subscribe((products) => {
      this.products = products;
    });
    this.loadCart();
  }

  private loadCart(): void {
    const cart = localStorage.getItem('cart');
    this.cart = cart ? JSON.parse(cart) : [];
  }

  private saveCart(cart: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  addToCart(product: Product): void {
    const cartItem = this.cart.find(
      (cartItem) => cartItem.product_id === product.id
    );

    const stockAvailability =
      this.products.find((p) => p.id === product.id)?.quantity || 0;

    if (cartItem && cartItem.quantity < stockAvailability) {
      cartItem.quantity++;
    } else {
      this.cart.push({ ...product, product_id: product.id, quantity: 1 });
    }

    this.saveCart(this.cart);
  }

  increaseQuantity(item: CartItem): void {
    const cartItem = this.cart.find(
      (cartItem) => cartItem.product_id === item.product_id
    );

    const productFromList = this.products.find((p) => p.id === item.product_id);

    if (cartItem && productFromList) {
      if (cartItem.quantity < productFromList.quantity) {
        cartItem.quantity++;
      }
    }

    this.saveCart(this.cart);
  }

  decreaseQuantity(item: CartItem): void {
    const cartItem = this.cart.find(
      (cartItem) => cartItem.product_id === item.product_id
    );

    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity--;
    }

    this.saveCart(this.cart);
  }

  removeFromCart(item: CartItem): void {
    this.cart = this.cart.filter(
      (cartItem) => cartItem.product_id !== item.product_id
    );
    this.saveCart(this.cart);
  }

  calculateTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getProductStock(productId: string): number {
    const product = this.products.find((p) => p.id === productId);
    return product ? product.quantity : 0;
  }
}
