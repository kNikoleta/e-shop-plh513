import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart-service/cart.service';
import { OrderService } from '../order.service'; // Import the OrderService
import { Router } from '@angular/router'; // Import Router for navigation
import {ProductService} from '../product.service';

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
    private router: Router, // Inject Router for navigation
    private prdct: ProductService
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
    }));
  
    const order: Order = {
      id: 0, 
      date: new Date().toISOString().split('T')[0], 
      stat: "Success",
      products,
      total_price: this.totalAmount
    };
  
    // First, update the product quantities in the database
    const updateStockPromises = this.cartItems.map(item => {
      return this.prdct.getProductById(item.id).toPromise().then((product) => {
        product.quantity -= item.quantity; // Subtract the purchased quantity
        return this.prdct.updateProduct(product).toPromise(); // Update the product in the database
      });
    });
  
    // Once all stock updates are done, place the order
    Promise.all(updateStockPromises).then(() => {
      // Place the order after stock updates
      this.orderService.placeOrder(order).subscribe({
        next: response => {
          console.log('Order placed successfully', response);
          localStorage.removeItem('cart');
          this.cartItems = [];
          this.totalAmount = 0;
          alert('Order placed successfully!');
          this.router.navigate(['/']); 
        },
        error: error => {
          console.error('Error placing order', error);
          alert('Failed to place order. Please try again.');
        }
      });
    }).catch(error => {
      console.error('Error updating stock', error);
      alert('Failed to update product stock. Please try again.');
    });
  }
  
  
  
}
