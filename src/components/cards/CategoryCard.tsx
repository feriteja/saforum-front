import React from "react";
import { BsChevronCompactRight } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

const CategoryCard = ({ value }: { value: string }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/forum/s/${value}`)}
      className="flex items-center justify-between bg-primary px-3 py-2 rounded shadow cursor-pointer hover:outline outline-1 "
    >
      <h1 className="font-bold">{value}</h1>
      <BsChevronCompactRight size={20} />
    </div>
  );
};

export default CategoryCard;
