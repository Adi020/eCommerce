import { useEffect, useState } from "react";
import {
  removeCheckedCategories,
  setPriceFilter,
  setProductName,
} from "../../store/slices/productsInfo.slice";
import { useSelector, useDispatch } from "react-redux";
import CategoriesList from "./CategoriesList";
import { space } from "postcss/lib/list";

const FiltersActive = () => {
  const { idCategoriesChecked, productName, filtersActive, priceFilter } =
    useSelector((store) => store.productsInfo);
  const [isShowCategories, setIsShowCategories] = useState(false);

  const dispatch = useDispatch();

  const handleShowCategories = () => setIsShowCategories(!isShowCategories);
  const handleRemoveNameFilter = () => dispatch(setProductName(""));
  const handleResetPrice = () =>
    dispatch(setPriceFilter({ minPrice: "", maxPrice: "" }));
  const handleRemoveCategoriesFilter = () =>
    dispatch(removeCheckedCategories());
  const handleRemoveAllFilters = () => {
    handleRemoveNameFilter();
    handleRemoveCategoriesFilter();
    dispatch(setPriceFilter({ minPrice: "", maxPrice: "" }));
  };

  useEffect(() => {
    if (!idCategoriesChecked.length) {
      setIsShowCategories(false);
    }
  }, [idCategoriesChecked]);

  return (
    <>
      {filtersActive.length > 0 && (
        <hr className="h-[28px] min-[871px]:hidden border-red-400 border mx-4" />
      )}

      <ul className="flex flex-nowrap min-[871px]:flex-wrap items-center gap-2 text-gray-700">
        {productName && (
          <li>
            <article className=" bg-slate-700/10 rounded-2xl flex gap-1 px-3 justify-center items-center">
              <span>Text:</span>
              <span>{productName}</span>
              <i
                onClick={handleRemoveNameFilter}
                className="bx bx-x text-xl cursor-pointer h-full flex items-center"
              ></i>
            </article>
          </li>
        )}

        {idCategoriesChecked.length > 0 && (
          <li className="relative flex-shrink-0 items-center gap-2 min-[930px]:z-10 bg-slate-700/10 rounded-2xl px-3">
            <button onClick={handleShowCategories} className="flex">
              category ({idCategoriesChecked.length})
              <i
                className={`bx bxs-chevron-up transition-all duration-200 ${
                  isShowCategories && "rotate-[180deg]"
                } self-center text-end text-xl text-gray-600`}
              ></i>
            </button>
            <div
              className={`min-[930px]:absolute max-[929px]:fixed max-[929px]:left-0 max-[929px]:right-0 min-[930px]:-left-[12px] min-[930px]:overflow-hidden grid transition-all duration-200 ${
                isShowCategories
                  ? "min-[930px]:grid-rows-[1fr] max-[929px]:bottom-0"
                  : "min-[930px]:grid-rows-[0fr] max-[929px]:-bottom-[100%]"
              } bg-slate-100 rounded-sm shadow-[0_4px_4px_0_rgba(0,0,0,.25)] max-[929px]:z-30 px-3 min-[930px]:w-[280px] mt-2`}
            >
              <div className="overflow-hidden relative  grid max-[929px]:py-2">
                <button
                  onClick={handleShowCategories}
                  className="min-[930px]:hidden absolute right-0 top-0"
                >
                  <i className="bx bx-x text-3xl"></i>
                </button>
                <span className="min-[930px]:hidden text-center font-bold text-xl">
                  Categories
                </span>
                <div className="py-3 border-b-[2px] max-[929px]:max-h-[400px] max-[929px]:overflow-y-auto">
                  <CategoriesList />
                </div>
                <span
                  onClick={handleRemoveCategoriesFilter}
                  className="place-self-center p-2 hover:text-red-400 text-red-500 font-normal cursor-pointer"
                >
                  Delete all
                </span>
              </div>
            </div>
          </li>
        )}
        <div
          onClick={handleShowCategories}
          className={`fixed ${
            isShowCategories ? "visible" : "hidden"
          } top-0 left-0 bottom-0 right-0 min-[930px]:hidden bg-black/40 z-20`}
        ></div>
        {priceFilter.activeFilter && (
          <li className="relative flex justify-center items-center flex-shrink-0 z-10 bg-slate-700/10 rounded-2xl gap-1 px-3">
            {priceFilter.minPrice > 0 ? (
              <span className="order-2">${priceFilter.minPrice}</span>
            ) : (
              <span className="">&lt;</span>
            )}
            {priceFilter.minPrice > 0 && priceFilter.maxPrice !== Infinity && (
              <span className="order-3">-</span>
            )}
            {priceFilter.maxPrice !== Infinity ? (
              <span className="order-4">${priceFilter.maxPrice}</span>
            ) : (
              <span className="order-1">&gt;</span>
            )}

            <i
              onClick={handleResetPrice}
              className="bx bx-x text-xl order-6 cursor-pointer h-full flex items-center"
            ></i>
          </li>
        )}

        {filtersActive.length > 0 && (
          <li className="font-normal text-red-500 flex-shrink-0 max-[870px]:pr-9">
            <span
              onClick={handleRemoveAllFilters}
              className="cursor-pointer hover:text-red-400"
            >
              Clear all
            </span>
          </li>
        )}
      </ul>
    </>
  );
};
export default FiltersActive;
