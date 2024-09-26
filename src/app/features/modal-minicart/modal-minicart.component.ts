import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '@shared/services/cart.service';
import { CartItem } from '@model/cart-item.model';

@Component({
  selector: 'modal-minicart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-minicart.component.html',
  styleUrls: ['./modal-minicart.component.scss'],
})
export class ModalMiniCartComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  cart: CartItem[] = [];
  total = 0;

  constructor(private router: Router, private cartService: CartService) {}

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
    this.loadCart(); // private?
  }

  getProductStock(productId: string): number {
    return this.cartService.getProductStock(productId);
  }
  goToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  onClose(): void {
    this.close.emit();
  }
}
