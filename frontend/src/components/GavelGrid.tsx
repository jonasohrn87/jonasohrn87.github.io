import React from "react";
import { Gavel } from "../models/Gavel";
import GavelCard from "./GavelCard";

const GavelGrid: React.FC<{ gavels: Gavel[] }> = ({ gavels }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {gavels.map((g) => (
        <GavelCard key={g.Id} gavel={g} />
      ))}
    </div>
  );
};

export default GavelGrid;
