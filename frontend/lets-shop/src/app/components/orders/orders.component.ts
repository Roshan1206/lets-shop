import { OrdersService } from './../../service/orders.service';
import { OrderItem } from './../../common/order-item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orderItems: OrderItem[] = [];

  constructor(private orderService: OrdersService) {}

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.orderService.fetchOrders().subscribe((data) => {
      this.orderItems = data;
      console.log(this.orderItems);
    });
  }
}
