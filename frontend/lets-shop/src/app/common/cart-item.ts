import { Product } from './product';

export class CartItem {
  constructor(
    public productId: number,
    public productName: string,
    public productPrice: number,
    public productQuantity: number,
    public productThumbnail: string,
    public totalProductPrice: number
  ) {}
}
