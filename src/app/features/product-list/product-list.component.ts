import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductService } from '@shared/services/product.service';
import { CartService } from '@shared/services/cart.service';
import { Product } from '@model/product';
import { ModalMiniCartComponent } from '@features/modal-minicart/modal-minicart.component';

@Component({
  selector: 'product-list',
  standalone: true,
  imports: [CommonModule, ModalMiniCartComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]> = new Observable<Product[]>();
  showModal = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.products$ = this.productService.products$;
    this.productService.fetchProducts().subscribe();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.showModal = true;
  }

  onModalClose() {
    this.showModal = false;
  }
}
