import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../order.service'; 

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
  orders: Order[] = []; 
  constructor(private orderService: OrderService) {} 

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.orderService.getOrders().subscribe({
      next: (fetched_orders: Order[]) => {
        this.orders = fetched_orders;
        console.log('Fetched orders:', fetched_orders); 
      },
      error: (error) => {
        console.error('Error fetching orders', error);
      }
    });
  }
  
}

 
