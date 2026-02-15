import { Product } from "./Product";

export interface Gavel {
  Id: number;
  Title: string;
  Image?: string;
  GavelProducts: {
    Product: Product;
  }[];
}