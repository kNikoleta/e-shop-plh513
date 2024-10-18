import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../order.service'; // Import the OrderService
import { Router } from '@angular/router'; // Import Router for navigation

interface Order {
  id: number;
  total_price: number;
  stat: string;
  date: string;
  products: { title: string; amount: number; price:number }[];
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = []; // Initialize an empty orders array
  constructor(private orderService: OrderService) {} // Inject the OrderService

  ngOnInit() {
    this.fetchOrders(); // Fetch orders on component initialization
  }

  fetchOrders() {
    this.orderService.getOrders().subscribe({
      next: (fetched_orders: Order[]) => {
        this.orders = fetched_orders;
        console.log('Fetched orders:', fetched_orders); // Log orders to inspect data
       // this.orders = orders.map((order) => ({
       //   ...order,
        //  date: order.date || new Date().toISOString().slice(0, 10) // Use order date if available
        //}));
      },
      error: (error) => {
        console.error('Error fetching orders', error);
      }
    });
  }
  
}

 
