import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

const greenColor = "text-green-600";
const yellowColor = "text-yellow-600";
const redColor = "text-red-600";

interface FoodContainerProps {
  title: string;
}

interface ProductItem {
  id: number;
  name: string;
  expiryDate: string;
}

const FoodContainer: React.FC<FoodContainerProps> = ({ title }) => {
  // Enkel mockdata per kategori
  const mockData: Record<string, ProductItem[]> = {
    Muffins: [
      { id: 1, name: "Blåbärsmuffin", expiryDate: "2026-01-23" },
      { id: 2, name: "Chokladmuffin", expiryDate: "2026-01-23" },
      { id: 3, name: "CaramelMuffin", expiryDate: "2026-01-23" },
      { id: 4, name: "Morotsmuffin", expiryDate: "2026-01-23" },
    ],
    Kondisbitar: [
      { id: 5, name: "Dammsugare", expiryDate: "2026-01-23" },
      { id: 6, name: "Biskvi", expiryDate: "2026-01-23" },
      { id: 7, name: "Mazarin", expiryDate: "2026-01-23" },
      { id: 8, name: "Chokladboll", expiryDate: "2026-01-23" },
    ],
  };

  const [editId, setEditId] = useState<number | null>(null);

  // Lokalt state – kan senare ersättas med databas
  const [items, setItems] = useState<ProductItem[]>(mockData[title] || []);
  const [editDateId, setEditDateId] = useState<number | null>(null);

  const getDateColor = (expiryDate: string): string => {
    const today = new Date();
    const targetDate = new Date(expiryDate);
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const diffInDays =
      (targetDate.getTime() - today.getTime()) / (1000 * 3600 * 24);

    if (diffInDays > 1) return "text-green-600";
    if (diffInDays === 1) return "text-yellow-600";
    if (diffInDays === 0) return "text-red-600";
    return "text-gray-400 line-through";
  };

  const handleDateChange = (date: Date, id: number) => {
    const updatedItems = items.map((item) =>
      item.id === id
        ? { ...item, expiryDate: date.toISOString().split("T")[0] }
        : item
    );
    setItems(updatedItems);
    setEditDateId(null);
  };

  const CustomInput = forwardRef<HTMLButtonElement, any>(
    ({ value, onClick }, ref) => (
      <button
        onClick={onClick}
        ref={ref}
        className={`w-full flex items-center justify-between text-sm text-left border rounded px-2 py-1 focus:outline-none`}
      >
        <span className={getDateColor(value)}>Bäst före: {value}</span>
        <CalendarDaysIcon className="w-4 h-4 text-gray-400 ml-2" />
      </button>
    )
  );
  CustomInput.displayName = "CustomInput";

  return (
    <section className="mb-8 px-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded shadow p-4 flex flex-col justify-between min-h-[120px]"
          >
            <h3 className="text-md font-medium mb-2">{item.name}</h3>
            <DatePicker
              selected={new Date(item.expiryDate)}
              onChange={(date) => {
                if (date) handleDateChange(date, item.id);
              }}
              customInput={<CustomInput />}
              dateFormat="yyyy-MM-dd"
              onClickOutside={() => setEditId(null)}
              popperPlacement="bottom-start"
              showPopperArrow={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FoodContainer;
