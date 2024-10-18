

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  img: string;
  quantity: number;
}

@Injectable({                                   
  providedIn: 'root', // This makes the service available throughout the app
})
export class ProductService {
  private apiUrl = 'http://localhost:3001/products'; // Update this URL to match your backend API

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`); // GET product by ID
  }

  getProductByTitle(title: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${title}`); // GET product by title
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // Update an existing product
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  // Delete a product
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
 
  

}
