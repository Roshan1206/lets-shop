import { map } from 'rxjs/operators';
import { API_CART_url } from './../app.constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  fetchCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${API_CART_url}/cart-items`);
  }

  addToCart(cartItem: CartItem) {
    this.http
      .post<any>(
        `${API_CART_url}/add-to-cart`,
        { productId: cartItem.productId, productQuantity: 1 },
        { observe: 'response' }
      )
      .subscribe({
        next: (responseData) => {
          this.cartItems.map((tempCartItem) => {
            if (tempCartItem.productId === cartItem.productId) {
              tempCartItem.productQuantity++;
            }
          });
          this.computeTotal();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  decrementItem(cartItem: CartItem) {
    if (cartItem.productQuantity === 1) {
      this.removeItem(cartItem);
    } else {
      this.http
        .post<any>(
          `${API_CART_url}/decrement-cart-item`,
          { productId: cartItem.productId, productQuantity: 1 },
          { observe: 'response' }
        )
        .subscribe({
          next: (responseData) => {
            this.cartItems.map((tempCartItem) => {
              if (tempCartItem.productId === cartItem.productId) {
                tempCartItem.productQuantity--;
              }
            });
            this.computeTotal();
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  removeItem(cartItem: CartItem) {
    let index = this.cartItems.findIndex(
      (tempCartItem) => tempCartItem.productId === cartItem.productId
    );
    this.cartItems.splice(index, 1);

    this.http
      .post<any>(
        `${API_CART_url}/remove-cart-item`,
        { productId: cartItem.productId },
        { observe: 'response' }
      )
      .subscribe();

    this.computeTotal();
  }

  computeTotal() {
    let totalPriceValue = 0;
    let totalQuantityValue = 0;

    for (let tempCartItem of this.cartItems) {
      totalPriceValue +=
        tempCartItem.productQuantity * tempCartItem.productPrice;
      totalQuantityValue += tempCartItem.productQuantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }
}
