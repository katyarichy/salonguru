import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '@shared/services/product.service';
import { CartService } from '@shared/services/cart.service';
import { CartItem } from '@model/cart-item.model';

@Component({
  selector: 'checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cart: CartItem[] = [];
  total = 0;

  constructor(
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart(): void {
    this.cart = this.cartService.getCart();
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = this.cartService.calculateTotal();
  }

  increaseQuantity(item: CartItem): void {
    this.cartService.increaseQuantity(item);
    this.calculateTotal();
  }

  decreaseQuantity(item: CartItem): void {
    this.cartService.decreaseQuantity(item);
    this.calculateTotal();
  }

  removeFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
    this.loadCart();
  }

  getProductStock(productId: string): number {
    return this.cartService.getProductStock(productId);
  }

  proceedToCheckout(): void {
    const checkoutItems = this.cart.map((item) => ({
      product_id: item.product_id,
      quantity: item.quantity,
    }));

    this.productService.checkout(checkoutItems).subscribe({
      next: (response) => {
        console.log('successful', response);
        this.productService.fetchProducts().subscribe(() => {
          this.router.navigate(['/success']);
        });

        localStorage.removeItem('cart');
      },
      error: (error) => {
        console.error('error', error);
      },
    });
  }
}
