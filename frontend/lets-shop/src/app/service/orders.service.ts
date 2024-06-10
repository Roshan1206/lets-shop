import { API_ORDERS_URL } from './../app.constant';
import { OrderItem } from './../common/order-item';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  fetchOrders() {
    return this.http.get<OrderItem[]>(`${API_ORDERS_URL}/get-orders`);
  }
}
