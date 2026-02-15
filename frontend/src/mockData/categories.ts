import { Category } from "../models/Category";

export const mockCategories: Category[] = [
  { Id: 1, Name: "Barn", TargetPercentage: 10.4 },
  { Id: 2, Name: "Bröd", TargetPercentage: 28.7 },
  { Id: 3, Name: "Chark", TargetPercentage: 24.8 },
  { Id: 4, Name: "Djupfryst", TargetPercentage: 22.5 },
  { Id: 5, Name: "Djur", TargetPercentage: 27.8 },
  { Id: 6, Name: "Drycker", TargetPercentage: 31.9 },
  { Id: 7, Name: "Fisk", TargetPercentage: 1.0 },
  { Id: 8, Name: "Färdigmat/Snabbmat", TargetPercentage: 32.4 },
  { Id: 9, Name: "Grov kem", TargetPercentage: 23.1 },
  { Id: 10, Name: "Konfektyr", TargetPercentage: 30.8 },
  { Id: 11, Name: "Kroppsvård", TargetPercentage: 31.5 },
  { Id: 12, Name: "Kylt Vegetariskt", TargetPercentage: 1.0 },
  { Id: 13, Name: "Kött", TargetPercentage: 11.6 },
  { Id: 14, Name: "Mejeri", TargetPercentage: 19.1 },
  { Id: 15, Name: "Ost", TargetPercentage: 22.5 },
  { Id: 16, Name: "Snacks", TargetPercentage: 34.3 },
  { Id: 17, Name: "Specerier", TargetPercentage: 24.5 },
  { Id: 18, Name: "Special", TargetPercentage: 40.2 },
];

// export a second value that the HMR runtime may try to import

export const test = mockCategories;

console.log("categories loaded");