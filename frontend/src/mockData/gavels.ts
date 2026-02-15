import { Gavel } from "../models/Gavel";
import { mockProducts } from "./products";

export const mockGavels: Gavel[] = [
  {
    Id: 1,
    Title: "Taco",
    GavelProducts: [
      { Product: mockProducts[0] },
      { Product: mockProducts[1] },
      { Product: mockProducts[2] },
      { Product: mockProducts[3] },
    ],
  },
];

// a dummy export to keep the file non‑empty during the build
export const test = mockGavels;

console.log("gavels loaded");