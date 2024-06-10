import { OrdersComponent } from './components/orders/orders.component';
import { RouteGuardService } from './service/route-guard.service';
import { LoginComponent } from './components/login/login.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductComponent } from './components/product/product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  { path: '', component: ProductComponent, pathMatch: 'full' },
  { path: 'products', component: ProductComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'search/:keyword', component: ProductComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'user',
    canActivate: [RouteGuardService],
    children: [
      { path: 'add-product', component: AddProductComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'cart', component: CartComponent },
      { path: 'orders', component: OrdersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
