import { Component, OnInit } from '@angular/core';
import { AddProduct } from '../../common/add-product';
import { ProductService } from '../../service/product.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      stock: new FormControl('', Validators.required),
      brand: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      thumbnail: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    const addProduct = new AddProduct(
      this.productForm.value.name,
      this.productForm.value.description,
      this.productForm.value.price,
      this.productForm.value.stock,
      this.productForm.value.brand,
      this.productForm.value.category,
      this.productForm.value.thumbnail
    );
    console.log(addProduct);
    this.productService.addProduct(addProduct).subscribe((data) => {
      console.log(data);
    });
  }
}
