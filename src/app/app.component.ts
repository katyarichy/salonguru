import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@features/header/header.component';
import { CartService } from '@shared/services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <header></header>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  private cartService = inject(CartService);

  ngOnInit(): void {
    this.cartService.loadCart();
  }
}
