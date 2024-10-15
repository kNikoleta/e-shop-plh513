import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products = [
    {
      name: 'Product 1',
      description: 'This is a description for product 1',
      price: 19.99,
      image: 'https://via.placeholder.com/150',
      quantity: 2
    },
    {
      name: 'Product 2',
      description: 'This is a description for product 2',
      price: 29.99,
      image: 'https://via.placeholder.com/150',
      quantity: 2
    },
    {
      name: 'Product 3',
      description: 'This is a description for product 3',
      price: 39.99,
      image: 'https://via.placeholder.com/150',
      quantity: 2
    },
    {
      name: 'Product 4',
      description: 'This is a description for product 4',
      price: 49.99,
      image: 'assets/TUC_logo.png',
      quantity: 2
    }
  ];

  searchTerm: string = '';
  filteredProducts = [...this.products]; // Initialize with all products
  cart: CartItem[] = []; // Cart to hold added items
  filterProducts() {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

   // Inside your ProductsComponent class
   addToCart(product: { name: string; description: string; price: number; image: string; quantity: number }) {
    // Check if the product is already in the cart
    const existingItem = this.cart.find(item => item.name === product.name);

    if (existingItem) {
      // If the product is already in the cart, increase the quantity
      existingItem.quantity++;
    } else {
      // If the product is not in the cart, add it with quantity 1
      this.cart.push({ name: product.name, quantity: 1, price: product.price, image: product.image, description: product.description });
    }

    console.log('Current cart:', this.cart); // Debugging line to see cart items
  }
}
