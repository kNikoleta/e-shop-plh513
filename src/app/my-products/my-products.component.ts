import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- Import this

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
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
  product: Product = {id: 0, title: '', description: '', image: '', price: 0, quantity: 0 };
  products: Product[] = [
    {
      id : 1,
      title: 'Product 1',
      description: 'This is a description for product 1',
      price: 19.99,
      image: 'https://via.placeholder.com/150',
      quantity: 100 // Product 1 Quantity
    },
    {
      id : 2,
      title: 'Product 4',
      description: 'This is a description for product 3',
      price: 49.99,
      image: 'https://via.placeholder.com/150',
      quantity: 100 // Product 1 Quantity
    }
  ];

  onSubmit() {
    const existingProductIndex = this.products.findIndex(p => p.title === this.product.title);
    if (existingProductIndex !== -1) {
      // Update existing product
      this.products[existingProductIndex] = { ...this.product };
    } else {
      // Add new product
      this.products.push({ ...this.product });
    }
    this.resetForm();
  }

  editProduct(item: Product) {
    this.product = { ...item }; // Set the selected product for editing
  }

  deleteProduct(item: Product) {
    this.products = this.products.filter(p => p !== item);
  }

  resetForm() {
    this.product = {id:0, title: '',description: '', image: '', price: 0, quantity: 0 }; // Reset form
  }
}




