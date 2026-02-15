import React from "react";
import { Product } from "../models/Product";
import { inputClass } from "./formClasses";

interface AddGavelFormProps {
  products: Product[];
  newGavel: {
    Title: string;
    Image: string;
    ProductIds: number[];
  };
  setNewGavel: React.Dispatch<
    React.SetStateAction<{
      Title: string;
      Image: string;
      ProductIds: number[];
    }>
  >;
  addGavel: () => void;
}

const AddGavelForm: React.FC<AddGavelFormProps> = ({
  products,
  newGavel,
  setNewGavel,
  addGavel,
}) => {
  const [visible, setVisible] = React.useState(true);

  return (
    <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Add Gavel</h3>
        <button
          onClick={() => setVisible((v) => !v)}
          className="text-sm text-blue-600 hover:underline focus:outline-none"
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>

      {visible && (
        <>
          <input
            className={inputClass}
            placeholder="Title"
            value={newGavel.Title}
            onChange={(e) => setNewGavel({ ...newGavel, Title: e.target.value })}
          />

          <input
            className={`${inputClass} mt-3`}
            placeholder="Image URL"
            value={newGavel.Image}
            onChange={(e) => setNewGavel({ ...newGavel, Image: e.target.value })}
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
            className="mt-6 rounded-md  bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add Gavel
          </button>
        </>
      )}
    </div>
  );
};

export default AddGavelForm;
