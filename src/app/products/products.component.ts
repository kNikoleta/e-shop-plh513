import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CartService } from '../cart-service/cart.service';

interface CartItem {
  id: number;
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
      id: 1,
      name: 'Product 1',
      description: 'This is a description for product 1',
      price: 19.99,
      image: 'https://files.oaiusercontent.com/file-pDIr0cqyA9NZ9B5ybJhgi2CE?se=2024-10-14T15%3A49%3A36Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dd72b325c-b7b7-417f-8cc5-acf1a5350e8f.webp&sig=tgCSJmjNoDQuP0HZXKtpZktyWbFh/vYuHlaL4%2BW2TAo%3D',
      quantity: 2
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'This is a description for product 2',
      price: 29.99,
      image: 'https://via.placeholder.com/150',
      quantity: 2
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'This is a description for product 3',
      price: 39.99,
      image: 'https://via.placeholder.com/150',
      quantity: 2
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'This is a description for product 4',
      price: 49.99,
      image: 'https://files.oaiusercontent.com/file-7TYfeJJpwSagXzTEOFeAlhwo?se=2024-10-14T15%3A46%3A02Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D73b3c84e-50fa-4518-808d-86d18bbb8f24.webp&sig=M2ejkr0ecO9ArzVTYM3rvSFE1lLzw8IC/xyigoJTMS8%3D',
      quantity: 2
    }, {
      id: 1,
      name: 'Product 1',
      description: 'This is a description for product 1',
      price: 19.99,
      image: 'https://files.oaiusercontent.com/file-pDIr0cqyA9NZ9B5ybJhgi2CE?se=2024-10-14T15%3A49%3A36Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dd72b325c-b7b7-417f-8cc5-acf1a5350e8f.webp&sig=tgCSJmjNoDQuP0HZXKtpZktyWbFh/vYuHlaL4%2BW2TAo%3D',
      quantity: 2
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'This is a description for product 2',
      price: 29.99,
      image: 'https://via.placeholder.com/150',
      quantity: 2
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'This is a description for product 3',
      price: 39.99,
      image: 'https://via.placeholder.com/150',
      quantity: 2
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'This is a description for product 4',
      price: 49.99,
      image: 'https://files.oaiusercontent.com/file-7TYfeJJpwSagXzTEOFeAlhwo?se=2024-10-14T15%3A46%3A02Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D73b3c84e-50fa-4518-808d-86d18bbb8f24.webp&sig=M2ejkr0ecO9ArzVTYM3rvSFE1lLzw8IC/xyigoJTMS8%3D',
      quantity: 2
    }, {
      id: 1,
      name: 'Product 1',
      description: 'This is a description for product 1',
      price: 19.99,
      image: 'https://files.oaiusercontent.com/file-pDIr0cqyA9NZ9B5ybJhgi2CE?se=2024-10-14T15%3A49%3A36Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dd72b325c-b7b7-417f-8cc5-acf1a5350e8f.webp&sig=tgCSJmjNoDQuP0HZXKtpZktyWbFh/vYuHlaL4%2BW2TAo%3D',
      quantity: 2
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'This is a description for product 2',
      price: 29.99,
      image: 'https://via.placeholder.com/150',
      quantity: 2
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'This is a description for product 3',
      price: 39.99,
      image: 'https://via.placeholder.com/150',
      quantity: 2
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'This is a description for product 4',
      price: 49.99,
      image: 'https://files.oaiusercontent.com/file-7TYfeJJpwSagXzTEOFeAlhwo?se=2024-10-14T15%3A46%3A02Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D73b3c84e-50fa-4518-808d-86d18bbb8f24.webp&sig=M2ejkr0ecO9ArzVTYM3rvSFE1lLzw8IC/xyigoJTMS8%3D',
      quantity: 2
    }
  ];

  searchTerm: string = '';
  filteredProducts = [...this.products];

  constructor(private cartService: CartService) {} // Inject the CartService

  filterProducts() {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  addToCart(product: CartItem) {
    this.cartService.addToCart(product); // Use the CartService to add to cart
    console.log('Current cart:', this.cartService.getCartItems()); // For debugging
  }
}
