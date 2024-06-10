export class Address {
  constructor(
    public country: string,
    public state: string,
    public city: string,
    public streetLine1: string,
    public streetLine2: string,
    public zipCode: number
  ) {}
}
