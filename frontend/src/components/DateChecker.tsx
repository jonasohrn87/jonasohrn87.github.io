import React from "react";
import FoodContainer from "./FoodContainer";

const DateChecker: React.FC = () => {
  return (
    <div>
      {/* Reuse the existing FoodContainer for each category */}
      <FoodContainer title="Muffins" />
      <FoodContainer title="Kondisbitar" />
    </div>
  );
};

export default DateChecker;
