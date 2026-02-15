import { Product } from "../models/Product";

export const mockProducts: Product[] = [
  {
    Id: 1,
    Brand: "Sanjo-Gruppen",
    Name: "Tortillabröd",
    CategoryId: 17,
    Category: {
      Id: 17,
      Name: "Specerier",
      TargetPercentage: 24.5,
    },
    Price: 10.00,
    ProfitMarginAmount: 2.43,
    ProfitMarginPercentage: 27.2,
    BuyType: "SingleBuy",
  },
  {
    Id: 2,
    Brand: "Santa Maria",
    Name: "Tacosås",
    CategoryId: 17,
    Category: {
      Id: 17,
      Name: "Specerier",
      TargetPercentage: 24.5,
    },
    Price: 19.50,
    ProfitMarginAmount: 4.53,
    ProfitMarginPercentage: 26.02,
    BuyType: "SingleBuy",
  },
  {
    Id: 3,
    Brand: "Banderos",
    Name: "Jalapenos",
    CategoryId: 17,
    Category: {
      Id: 17,
      Name: "Specerier",
      TargetPercentage: 24.5,
    },
    Price: 20.00,
    ProfitMarginAmount: 7.53,
    ProfitMarginPercentage: 42.15,
    BuyType: "SingleBuy",
  },
  {
    Id: 4,
    Brand: "Santa Maria",
    Name: "Tacokrydda",
    CategoryId: 17,
    Category: {
      Id: 17,
      Name: "Specerier",
      TargetPercentage: 24.5,
    },
    Price: 14.95,
    ProfitMarginAmount: 4.95,
    ProfitMarginPercentage: 37.08,
    BuyType: "SingleBuy",
  },
  
];

// expose a dummy export so the module never becomes empty during
// optimization/refresh; HMR sometimes requests `test` from modules
// that appear unused.
export const test = mockProducts;

console.log("products loaded");