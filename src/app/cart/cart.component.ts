import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart-service/cart.service';
import { OrderService } from '../order.service'; // Import the OrderService
import { Router } from '@angular/router'; // Import Router for navigation

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  img: string;
}

interface Order {
  id: number;
  total_price: number;
  stat: string;
  date: string;
  products: { title: string; amount: number; price:number }[];
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

  constructor(
    private cartService: CartService,
    private orderService: OrderService, // Inject the OrderService
    private router: Router // Inject Router for navigation
  ) {}

  ngOnInit() {
    this.loadCart();
    this.calculateTotal();
  }

  loadCart() {
    this.cartItems = this.cartService.getCartItems();
  }

  calculateTotal() {
    this.totalAmount = this.cartService.calculateTotal();
  }

  removeItem(item: CartItem) {
    this.cartService.removeItem(item);
    this.loadCart();
    this.calculateTotal();
  }

  updateQuantity(item: CartItem, quantity: number) {
    this.cartService.updateQuantity(item, quantity);
    this.loadCart();
    this.calculateTotal();
  }

  onQuantityChange(item: CartItem, event: Event) {
    const quantity = (event.target as HTMLInputElement).valueAsNumber;
    this.updateQuantity(item, quantity);
  }

  checkout() {
    const products = this.cartItems.map(item => ({
      title: item.title,
      amount: item.quantity,
      price: item.price
     // product_id: item.id // Ensure this matches your backend expectations
    }));
  
    const order: Order = {
      id: 0, // This will typically be set by the backend, you can use 0 or -1 temporarily
      date: new Date().toISOString().split('T')[0], // Current date in 'YYYY-MM-DD' format
      stat: "Success",
      products,
      total_price: this.totalAmount
    };
  
    this.orderService.placeOrder(order).subscribe({
      next: response => {
        console.log('Order placed successfully', response);
        localStorage.removeItem('cart');
        this.cartItems = [];
        this.totalAmount = 0;
        alert('Order placed successfully!');
        this.router.navigate(['/']); // Navigate to the homepage or another page
      },
      error: error => {
        console.error('Error placing order', error);
        alert('Failed to place order. Please try again.');
      }
    });
  }
  
  
}
