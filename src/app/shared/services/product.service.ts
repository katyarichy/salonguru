import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'environments/environment';
import { Product } from '@model/product';
import { ProductAPI } from '@model/api/product-api';
import { CheckoutAPI } from '@model/api/checkout-api';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl;
  private checkoutUrl = environment.checkoutUrl;
  private apiKey = environment.apiKey;

  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'x-api-key': this.apiKey,
    });
  }

  fetchProducts(): Observable<ProductAPI> {
    const headers = this.getHeaders();
    return this.http.get<ProductAPI>(this.apiUrl, { headers }).pipe(
      tap((response: ProductAPI) => {
        this.productsSubject.next(response.products);
      })
    );
  }

  checkout(cart: CheckoutAPI[]): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.checkoutUrl, cart, { headers });
  }
}
