import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fetchCart();
  }

  fetchCart() {
    this.cartService.fetchCart().subscribe((data) => {
      this.cartItems = data;
      this.cartService.cartItems = data;
      this.cartService.computeTotal();
    });

    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );
  }

  onIncrementItem(item: CartItem) {
    this.cartService.addToCart(item);
  }

  onDecrementItem(item: CartItem) {
    this.cartService.decrementItem(item);
  }

  onRemoveItem(item: CartItem) {
    this.cartService.removeItem(item);
  }
}
