import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { OrdersComponent } from './orders/orders.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
    { path: 'products', component: ProductsComponent },
    { path: 'my-products', component: MyProductsComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'cart', component: CartComponent },
    { path: '', redirectTo: '/products', pathMatch: 'full' } // Redirect to 'products' by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }