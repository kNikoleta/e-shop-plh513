

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
  providedIn: 'root', 
})
export class ProductService {
  private apiUrl = 'http://localhost:3001/products'; 

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`); 
  }

  getProductByTitle(title: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${title}`); 
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }


  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
