import { Component } from '@angular/core';
import { Address } from '../../common/address';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  shippingAddress!: Address;
  billingAddress!: Address;

  onShippingAddress(address: any) {
    this.shippingAddress = address;
    console.log(address);
  }

  // copyShippingToBillingAddress(event: any) {
  //   if (event.target.checked) {
  //     this.billingAddress = this.shippingAddress;
  //   } else {
  //     // this.billingAddress
  //   }
  // }

  // onBillingAddress(address: any) {
  //   this.billingAddress = address;
  //   // console.log(address);
  // }
}
