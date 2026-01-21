import React from "react";

const StoreHelper: React.FC = () => {
  // Minimal starter UI for store helper. Can be expanded later.
  const categories = ["Muffins", "Kondisbitar", "Frukt", "Grönsaker"];

  return (
    <section className="px-4">
      <h2 className="text-xl font-semibold mb-4">Store helper</h2>
      <p className="mb-4 text-sm text-gray-600">Quick category view and small helpers.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((c) => (
          <div key={c} className="bg-white rounded shadow p-4">
            <h3 className="font-medium">{c}</h3>
            <p className="text-sm text-gray-500">Placeholder info for {c}.</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StoreHelper;
