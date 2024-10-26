import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ProductService } from '../product.service'; // Adjust the import path as necessary

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  img: string;
  quantity: number;
}

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})

export class MyProductsComponent {
  product: Product = { id: 0, title: '', description: '', img: '', price: 0, quantity: 0 };
  products: Product[] = [];

  constructor(private productService: ProductService) {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data; 
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
  }

  onSubmit() {
    if (this.product.id) {
      this.productService.updateProduct(this.product).subscribe(
        () => {
          this.fetchProducts(); 
        },
        error => {
          console.error('Error updating product', error);
        }
      );
    } else {
      this.productService.addProduct(this.product).subscribe(
        () => {
          this.fetchProducts(); 
        },
        error => {
          console.error('Error adding product', error);
        }
      );
    }
    this.resetForm(); 
  }
  
  
  editProduct(item: Product) {
    this.product = { ...item };
  }

  deleteProduct(item: Product) {
    this.productService.deleteProduct(item.id).subscribe({
      next: () => {
        this.fetchProducts(); 
      },
      error: (error) => {
        console.error('Error deleting product', error);
      }
    });
  }

  resetForm() {
    this.product = { id: 0, title: '', description: '', img: '', price: 0, quantity: 0 }; // Reset form
  }
}
