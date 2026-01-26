import React, { useEffect, useState } from "react";

/* =======================
   Tailwind form classes
======================= */
const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

const selectClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

/* =======================
   Interfaces
======================= */
interface Product {
  Id: number;
  Brand: string;
  Name: string;
  CategoryId: number;
  Category: { Id: number; Name: string };
  Price: number;
  ProfitMarginAmount: number;
  ProfitMarginPercentage: number;
  Image?: string;
  BuyType: "SingleBuy" | "MultiBuy";
}

interface Gavel {
  Id: number;
  Title: string;
  Image?: string;
  GavelProducts: { Product: Product }[];
}

/* =======================
   Component
======================= */
const StoreHelper: React.FC = () => {
  console.log("StoreHelper component rendered");
  const [products, setProducts] = useState<Product[]>([]);
  const [gavels, setGavels] = useState<Gavel[]>([]);
  const [categories, setCategories] = useState<{ Id: number; Name: string }[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const [newGavel, setNewGavel] = useState({
    Title: "",
    Image: "",
    ProductIds: [] as number[],
  });

  const API_BASE = "http://localhost:5096/api";

  /* =======================
     Fetch data
  ======================= */
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, gavelsRes, categoriesRes] = await Promise.all([
        fetch(`${API_BASE}/products`),
        fetch(`${API_BASE}/gavels`),
        fetch(`${API_BASE}/categories`),
      ]);

      if (!productsRes.ok || !gavelsRes.ok || !categoriesRes.ok) {
        throw new Error("Failed to fetch data");
      }

      setProducts(await productsRes.json());
      setGavels(await gavelsRes.json());
      setCategories(await categoriesRes.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     Add product
  ======================= */
  const addProduct = async () => {
    if (
      !newProduct.Brand ||
      !newProduct.Name ||
      !newProduct.CategoryId ||
      !newProduct.BuyType ||
      newProduct.Price == null ||
      isNaN(newProduct.Price) ||
      newProduct.ProfitMarginAmount == null ||
      isNaN(newProduct.ProfitMarginAmount) ||
      newProduct.ProfitMarginPercentage == null ||
      isNaN(newProduct.ProfitMarginPercentage)
    ) {
      alert("Please fill all required fields with valid values.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        throw new Error(`Failed to add product`);
      }

      await fetchData();
      setNewProduct({});
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  /* =======================
     Add gavel
  ======================= */
  const addGavel = async () => {
    if (!newGavel.Title || newGavel.ProductIds.length === 0) return;

    try {
      const res = await fetch(`${API_BASE}/gavels`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGavel),
      });

      if (!res.ok) throw new Error("Failed to add gavel");

      await fetchData();
      setNewGavel({ Title: "", Image: "", ProductIds: [] });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  if (loading) return <div className="text-center text-xl">Loading StoreHelper...</div>;
  if (error) return <div className="text-center text-xl text-red-500">Error: {error}</div>;

  /* =======================
     Render
  ======================= */
  return (
    <section className="px-4">
      <h2 className="mb-4 text-xl font-semibold">Store Helper</h2>
      <p className="mb-6 text-sm text-gray-600">
        Manage products and gavels.
      </p>

      {/* Add Product */}
      <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          Add Product
        </h3>

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
                  e.target.value === ""
                    ? undefined
                    : Number(e.target.value),
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

      {/* Add Gavel */}
      <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Add Gavel</h3>

        <input
          className={inputClass}
          placeholder="Title"
          value={newGavel.Title}
          onChange={(e) =>
            setNewGavel({ ...newGavel, Title: e.target.value })
          }
        />

        <input
          className={`${inputClass} mt-3`}
          placeholder="Image URL"
          value={newGavel.Image}
          onChange={(e) =>
            setNewGavel({ ...newGavel, Image: e.target.value })
          }
        />

        <div className="mt-4 space-y-2">
          {products.map((p) => (
            <label key={p.Id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={newGavel.ProductIds.includes(p.Id)}
                onChange={(e) =>
                  setNewGavel({
                    ...newGavel,
                    ProductIds: e.target.checked
                      ? [...newGavel.ProductIds, p.Id]
                      : newGavel.ProductIds.filter((id) => id !== p.Id),
                  })
                }
              />
              {p.Brand} – {p.Name}
            </label>
          ))}
        </div>

        <button
          onClick={addGavel}
          className="mt-6 rounded-md bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Add Gavel
        </button>
      </div>

      {/* Gavels */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {gavels.map((gavel) => (
          <div key={gavel.Id} className="rounded-lg bg-white p-4 shadow">
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
                  Category: {gp.Product.Category.Name} | Price:{" "}
                  {gp.Product.Price} SEK
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default StoreHelper;
