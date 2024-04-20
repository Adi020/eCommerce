import { useSelector, useDispatch } from "react-redux";
import {
  addCheckedCategory,
  setProductsByCategory,
} from "../../store/slices/productsInfo.slice";
import { useEffect } from "react";
import React from 'react';
import { v4 as uuidv4 } from 'uuid';


const Category = ({ category }) => {
  const { filteredProducts, productsByCategory } = useSelector(
    (store) => store.productsInfo
  );
  const uniqueId = uuidv4();

  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const categoryNameCheck = e.target.getAttribute("category-name");
    dispatch(addCheckedCategory(categoryNameCheck));
  };

  useEffect(() => {
    dispatch(setProductsByCategory(category.id));
  }, [filteredProducts]);

  return (
    <div className="relative grid grid-cols-[auto_1fr_auto] gap-4">
      <label
        className="cursor-pointer absolute top-0 left-0 w-full h-full"
        htmlFor={uniqueId}
      ></label>
      <input
        className="after:content-[''] after:w-[11px] cursor-pointer after:h-[7px] after:border-l-[2px] 
        after:border-b-[2px] after:rotate-[-45deg] after:border-white after:absolute flex justify-center items-center
        hover:after:border-gray-500 after:opacity-0 checked:after:opacity-100 transition-all duration-100 ease-in checked:bg-red-600/85 
        after:transition-all after:duration-100 after:ease-in hover:after:opacity-100 after:-translate-y-1/2 relative w-[20px] aspect-square 
         appearance-none self-center border-2 border-gray-400 bg-gray-700/10 rounded-[4px]"
        id={uniqueId}
        category-name={`${category.name}`}
        onChange={handleInputChange}
        type="checkbox"
        checked={category.checked}
      />
      <span className="font-semibold text-gray-700">{category.name}</span>
      <span className="font-semibold text-gray-700">
        {productsByCategory[category.id]?.length}
      </span>
    </div>
  );
};
export default Category;
