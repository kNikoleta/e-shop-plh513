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

  // Fetch products from the service
  fetchProducts() {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data; // Populate products with fetched data
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
  }

  // Handle form submission to add or update product
  onSubmit() {
    if (this.product.id) {
      // Update existing product
      this.productService.updateProduct(this.product).subscribe(
        () => {
          this.fetchProducts(); // Refresh product list after update
        },
        error => {
          console.error('Error updating product', error);
        }
      );
    } else {
      // Add new product
      this.productService.addProduct(this.product).subscribe(
        () => {
          this.fetchProducts(); // Refresh product list after adding
        },
        error => {
          console.error('Error adding product', error);
        }
      );
    }
    this.resetForm(); // Reset the form after submission
  }
  
  // Populate the form with the product data to be edited
  editProduct(item: Product) {
    this.product = { ...item }; // Set the selected product for editing
  }

  // Delete product
  deleteProduct(item: Product) {
    this.productService.deleteProduct(item.id).subscribe({
      next: () => {
        this.fetchProducts(); // Refresh product list after deletion
      },
      error: (error) => {
        console.error('Error deleting product', error);
      }
    });
  }

  // Reset form fields
  resetForm() {
    this.product = { id: 0, title: '', description: '', img: '', price: 0, quantity: 0 }; // Reset form
  }
}
