import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart-service/cart.service';

interface CartItem {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalAmount: number = 0;

  constructor(private cartService: CartService) {} // Inject the CartService

  ngOnInit() {
    this.loadCart();
    this.calculateTotal();
  }

  loadCart() {
    this.cartItems = this.cartService.getCartItems(); // Load items from the CartService
  }

  calculateTotal() {
    this.totalAmount = this.cartService.calculateTotal(); // Calculate total from CartService
  }

  removeItem(item: CartItem) {
    this.cartService.removeItem(item);
    this.loadCart(); // Refresh cart items
    this.calculateTotal(); // Recalculate total
  }

  updateQuantity(item: CartItem, quantity: number) {
    this.cartService.updateQuantity(item, quantity);
    this.loadCart(); // Refresh cart items
    this.calculateTotal(); // Recalculate total
  }

  onQuantityChange(item: CartItem, event: Event) {
    const quantity = (event.target as HTMLInputElement).valueAsNumber; // Cast event target to HTMLInputElement
    this.updateQuantity(item, quantity);
  }

  checkout() {
    // Handle checkout logic, e.g., send cart data to Order Service
    console.log('Proceeding with checkout', this.cartItems);
    localStorage.removeItem('cart');
    this.cartItems = [];
    this.totalAmount = 0;
    alert('Order placed successfully!');
  }
}
