import React from "react";
import { Gavel } from "../models/Gavel";

const GavelCard: React.FC<{ gavel: Gavel }> = ({ gavel }) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      {gavel.Image && (
        <img
          src={gavel.Image}
          alt={gavel.Title}
          className="mb-4 h-32 w-full rounded object-cover"
        />
      )}
      <h3 className="mb-2 text-lg font-medium">{gavel.Title}</h3>

      {gavel.GavelProducts.map((gp) => (
        <div key={gp.Product.Id} className="border-t pt-2 text-sm">
          <p className="font-medium">
            {gp.Product.Brand} – {gp.Product.Name}
          </p>
          <p className="text-xs text-gray-600">
            Category: {gp.Product.Category.Name} | Price: {gp.Product.Price} SEK |
            Mål: <span>{gp.Product.Category.TargetPercentage}%</span> |
            Marginal:{" "}
            <span
              className={
                gp.Product.ProfitMarginPercentage >
                gp.Product.Category.TargetPercentage
                  ? "text-green-600 font-semibold"
                  : "text-red-600 font-semibold"
              }
            >
              {gp.Product.ProfitMarginPercentage}%
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default GavelCard;
