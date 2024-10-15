import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Order {
  id: number;
  date: string;
  products: { name: string; quantity: number; price: number }[];
  totalPrice: number;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders: Order[] = [
    {
      id: 1,
      date: '2024-10-01',
      products: [
        { name: 'Product 1', quantity: 2, price: 19.99 },
        { name: 'Product 2', quantity: 1, price: 29.99 }
      ],
      totalPrice: 69.97 // 2 * 19.99 + 29.99
    },
    {
      id: 2,
      date: '2024-10-02',
      products: [
        { name: 'Product 3', quantity: 3, price: 39.99 },
        { name: 'Product 4', quantity: 2, price: 49.99 }
      ],
      totalPrice: 219.95 // 3 * 39.99 + 2 * 49.99
    }
  ];
}
