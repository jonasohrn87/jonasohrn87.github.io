import React from "react";
import { Product } from "../models/Product";
import { Category } from "../models/Category";
import { inputClass, selectClass } from "./formClasses";

interface AddProductFormProps {
  categories: Category[];
  newProduct: Partial<Product>;
  setNewProduct: React.Dispatch<React.SetStateAction<Partial<Product>>>;
  addProduct: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({
  categories,
  newProduct,
  setNewProduct,
  addProduct,
}) => {
  return (
    <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">Add Product</h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          className={inputClass}
          placeholder="Brand"
          value={newProduct.Brand ?? ""}
          onChange={(e) =>
            setNewProduct({ ...newProduct, Brand: e.target.value })
          }
        />

        <input
          className={inputClass}
          placeholder="Name"
          value={newProduct.Name ?? ""}
          onChange={(e) =>
            setNewProduct({ ...newProduct, Name: e.target.value })
          }
        />

        <select
          className={selectClass}
          value={newProduct.CategoryId ?? ""}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              CategoryId:
                e.target.value === "" ? undefined : Number(e.target.value),
            })
          }
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.Id} value={cat.Id}>
              {cat.Name}
            </option>
          ))}
        </select>

        <select
          className={selectClass}
          value={newProduct.BuyType ?? ""}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              BuyType: e.target.value as "SingleBuy" | "MultiBuy",
            })
          }
        >
          <option value="">Buy type</option>
          <option value="SingleBuy">Single Buy</option>
          <option value="MultiBuy">Multi Buy</option>
        </select>

        <input
          type="number"
          className={inputClass}
          placeholder="Price (SEK)"
          value={newProduct.Price ?? ""}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              Price: Number(e.target.value),
            })
          }
        />

        <input
          type="number"
          className={inputClass}
          placeholder="Profit Margin Amount"
          value={newProduct.ProfitMarginAmount ?? ""}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              ProfitMarginAmount: Number(e.target.value),
            })
          }
        />

        <input
          type="number"
          className={inputClass}
          placeholder="Profit Margin %"
          value={newProduct.ProfitMarginPercentage ?? ""}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              ProfitMarginPercentage: Number(e.target.value),
            })
          }
        />
      </div>

      <button
        onClick={addProduct}
        className="mt-6 rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Product
      </button>
    </div>
  );
};

export default AddProductForm;
