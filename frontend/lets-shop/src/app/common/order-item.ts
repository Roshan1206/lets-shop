export class OrderItem {
  constructor(
    public productId: number,
    public productName: string,
    public productThumbnail: string,
    public productPrice: number,
    public productQuantity: number,
    public totalPrice: number,
    public createdDate: Date
  ) {}
}
