export interface Price {
  regPrice: number;
  finalPrice: number;
  salePrice: number | null;
  percentOff?: number;
}
