export class ProductCategory {
  constructor(
    public id: number,
    public productCategory: string,
    public description: string,
    public price: number,
    public stock: number,
    public brand: string,
    public category: string,
    public thumbnail: string
  ) {}
}
