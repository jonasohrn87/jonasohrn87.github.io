import { Category } from "./Category.ts";

export interface Product {
  Id: number;
  Brand: string;
  Name: string;
  CategoryId: number;
  Category: Category;
  Price: number;
  ProfitMarginAmount: number;
  ProfitMarginPercentage: number;
  Image?: string;
  BuyType: "SingleBuy" | "MultiBuy";
}