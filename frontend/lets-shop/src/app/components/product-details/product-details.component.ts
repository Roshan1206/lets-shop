import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from 'src/app/common/product';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.handleProduct();
  }

  handleProduct() {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(productId).subscribe((data: any) => {
      this.product = data;
      console.log(this.product);
    });
  }

  addToCart(product: Product) {
    const tempCartItem: CartItem = new CartItem(
      product.id,
      product.name,
      product.price,
      1,
      product.thumbnail,
      product.price
    );
    this.cartService.addToCart(tempCartItem);
  }
}
