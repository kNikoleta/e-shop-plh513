import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { CartService } from '../cart-service/cart.service';
import { ProductService } from '../product.service'; 


interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  description: string;
  img: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  img: string;
  quantity: number;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  
})
export class ProductsComponent implements OnInit {
  products: Product[] = []; // Store products fetched from API
  searchTerm: string = '';
  filteredProducts: Product[] = []; // Store filtered products

  constructor(private cartService: CartService, private productService: ProductService) {}

  ngOnInit() {
    this.fetchProducts(); 
  }

  fetchProducts() {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data; // Assign fetched data to products
        this.filteredProducts = [...this.products]; // Initialize filteredProducts
      },
      error: (error) => {
        console.error('Error fetching products', error);
      },
      complete: () => {
        console.log('Product fetching completed');
      }
    });
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  addToCart(product: CartItem) {
    this.cartService.addToCart(product); 
    console.log('Current cart:', this.cartService.getCartItems());
  }
}
