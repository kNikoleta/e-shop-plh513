import { Injectable } from '@angular/core';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  img: string;
}

@Injectable({
  providedIn: 'root', // Make this service available app-wide
})
export class CartService {
  private cartItems: CartItem[] = [];
  
  constructor() {
    this.loadCart();
  }

  loadCart() {
    const storedCart = localStorage.getItem('cart') ?? '[]'; // Default to an empty array if null
    this.cartItems = JSON.parse(storedCart);
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  addToCart(item: CartItem) {
    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1; // Increase quantity if already in cart
    } else {
      this.cartItems.push({ ...item, quantity: 1 }); // Add new item
    }
    this.saveCart(); // Save changes
  }

  removeItem(item: CartItem) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
    this.saveCart();
  }

  updateQuantity(item: CartItem, quantity: number) {
    const cartItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (cartItem) {
      if (quantity <= 0) {
        this.removeItem(cartItem); // Remove if quantity is less than or equal to 0
      } else {
        cartItem.quantity = quantity; // Update quantity
        this.saveCart();
      }
    }
  }

  calculateTotal() {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }
}
