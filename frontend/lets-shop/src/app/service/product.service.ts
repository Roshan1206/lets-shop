import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Product } from './../common/product';
import { AddProduct } from '../common/add-product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl: string = 'http://localhost:8080/products';
  private productCategoryUrl: string = 'http://localhost:8080/product-category';

  constructor(private httpClient: HttpClient) {}

  getProductList(thePage: number, thePageSize: number): Observable<Product[]> {
    const productsUrl = `${this.baseUrl}?page=${thePage}&size=${thePageSize}`;
    // return this.httpClient
    //   .get<GetResponseProduct>(this.baseUrl)
    //   .pipe(map((response) => response._embedded.products));
    return this.httpClient.get<Product[]>(productsUrl);
  }

  getProduct(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/${productId}`);
  }

  getProductSearch(
    thePage: number,
    thePageSize: number,
    productName: string
  ): Observable<Product[]> {
    const searchUrl: string = `${this.baseUrl}/search/findByNameContaining?name=${productName}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<Product[]>(searchUrl);
  }

  addProduct(product: AddProduct): Observable<AddProduct> {
    return this.httpClient.post<AddProduct>(this.baseUrl, product);
  }

  // getProductCategory(productCategories:)
}

interface GetResponseProduct {
  _embedded: {
    products: Product[];
  };
}
