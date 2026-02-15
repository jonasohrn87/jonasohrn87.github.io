import React, { useEffect, useState } from "react";
import { Product } from "../models/Product";
import { Gavel } from "../models/Gavel";
import { Category } from "../models/Category";

import { mockProducts } from "../mockData/products";
import { mockGavels } from "../mockData/gavels";
import { mockCategories } from "../mockData/categories";

import AddProductForm from "./AddProductForm";
import AddGavelForm from "./AddGavelForm";
import GavelGrid from "./GavelGrid";

// keep the mock-data modules alive so they aren't optimized away.
console.log("mockProducts (debug):", mockProducts);
console.log("mockGavels (debug):", mockGavels);
console.log("mockCategories (debug):", mockCategories);

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
      fetch(`${API_BASE}/Product`),
      fetch(`${API_BASE}/Gavel`),
      fetch(`${API_BASE}/Category`),
    ]);

    if (!productsRes.ok || !gavelsRes.ok || !categoriesRes.ok) {
      throw new Error("API unavailable");
    }

    const products = await productsRes.json();
    const gavels = await gavelsRes.json();
    const categories = await categoriesRes.json();

    setProducts(products);
    setGavels(gavels);
    setCategories(categories);

    console.log("Loaded data from API ✅");
  } catch (err) {
    console.warn("API failed, using mock data instead ⚠️");

    setProducts(mockProducts);
    setGavels(mockGavels);
    setCategories(mockCategories);
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

  console.log("Rendering StoreHelper JSX");
  return (
    <section className="px-4">
      <h2 className="mb-4 text-xl font-semibold">Store Helper</h2>
      <p className="mb-6 text-sm text-gray-600">
        Manage products and gavels.
      </p>

      {/* Add Product section moved to separate component */}
      <AddProductForm
        categories={categories as Category[]}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        addProduct={addProduct}
      />

      {/* Add Gavel section moved to separate component */}
      <AddGavelForm
        products={products}
        newGavel={newGavel}
        setNewGavel={setNewGavel}
        addGavel={addGavel}
      />

      {/* Gavels */}
      <GavelGrid gavels={gavels} />
    </section>
  );
};

export default StoreHelper;
