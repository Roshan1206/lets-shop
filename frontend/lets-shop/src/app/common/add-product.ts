export class AddProduct {
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public stock: number,
    public brand: string,
    public category: string,
    public thumbnail: string
  ) {}
}
