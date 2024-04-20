import ProductsList from "../components/home/ProductsList";
import CategoriesList from "../components/home/CategoriesList";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getProducts,
  setFiltersActive,
  setPriceFilter,
  setProductsFilter,
} from "../store/slices/productsInfo.slice";
import FiltersActive from "../components/home/FiltersActive";
import NoResultsFound from "../components/home/NoResultsFound";
import LoadingProducts from "../components/animation/LoadingProducts";

const Home = () => {
  const [isShowCategory, setIsShowCategory] = useState(true);
  const [isShowPrice, setIsShowPrice] = useState(true);
  const [isShowFilters, setIsShowFilters] = useState(false);
  const {
    products,
    filteredProducts,
    productName,
    idCategoriesChecked,
    filtersActive,
    priceFilter,
  } = useSelector((store) => store.productsInfo);

  const dispatch = useDispatch();

  const handleShowPrice = () => {
    setIsShowPrice(!isShowPrice);
    toast("shoPrice")
  };

  const handleShowCategory = () => {
    setIsShowCategory(!isShowCategory);
  };

  const handleShowFilters = () => {
    setIsShowFilters(!isShowFilters);
  };

  const handleSubmitPrice = (e) => {
    e.preventDefault();
    dispatch(
      setPriceFilter({
        minPrice: e.target.minPrice.value,
        maxPrice: e.target.maxPrice.value,
      })
    );
  };

  useEffect(() => {
    dispatch(setProductsFilter());
  }, [productName, idCategoriesChecked, products, priceFilter]);

  useEffect(() => {
    if (!products.length) {
    dispatch(getProducts());
    }
  }, []);

  useEffect(() => {
    dispatch(setFiltersActive());
  }, [productName, idCategoriesChecked, priceFilter]);

  return (
    <div className="max-w-[1280px] self-start mx-auto flex w-full place-self-center gap-x-7 p-5 pt-[90px]">
      <aside
        className={`min-[871px]:min-w-[280px] max-[929px]:py-5 max-[929px]:relative min-w-[300px] max-[870px]:border-none max-[870px]:rounded-none max-[870px]:shadow-black/30 transition-all duration-200 ${
          isShowFilters ? "max-[870px]:right-0" : "max-[870px]:-right-[100%]"
        } max-[870px]:fixed max-[870px]:top-0 max-[870px]:z-40 bg-white h-full px-4 border rounded-md pb-4 pt-2`}
      >
        <button
          onClick={handleShowFilters}
          className="min-[870px]:hidden absolute top-0 right-0"
        >
          <i className="bx bx-x text-3xl text-gray-600"></i>
        </button>
        <div
          className={`transition-all duration-300 gap-3 grid  ${
            isShowPrice ? "grid-rows-[auto_1fr]" : "grid-rows-[auto_0fr]"
          }`}
        >
          <div
            onClick={handleShowPrice}
            className="border-b-[2px] p-1 flex justify-between border-b-gray-300 cursor-pointer"
          >
            <h4 className="font-bold text-gray-700">Price</h4>
            <i
              className={`bx bxs-chevron-up transition-all duration-700 ${
                isShowPrice && "rotate-[180deg]"
              } self-center text-end text-xl text-gray-600`}
            ></i>
          </div>
          <article className="overflow-hidden">
            <form onSubmit={handleSubmitPrice} className=" grid gap-y-4 p-2">
              <div className="flex justify-between items-center text-gray-600">
                <label className="" htmlFor="minusPrice">
                  From
                </label>
                <input
                  className="border w-[170px] rounded-md px-2 h-[35px]"
                  id="minPrice"
                  type="number"
                  min={0}
                />
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <label htmlFor="maxPrice">To</label>
                <input
                  className="border w-[170px] rounded-md px-2 h-[35px]"
                  id="maxPrice"
                  type="number"
                  min={0}
                />
              </div>
              <button
                className="h-[40px] w-[100px] rounded-md text-white hover:bg-red-400 font-[yantramanav] place-self-end bg-red-500"
                type="submit"
              >
                Filter price
              </button>
            </form>
          </article>
        </div>
        <div
          className={`transition-all duration-300 grid ${
            isShowCategory ? "grid-rows-[auto_1fr]" : "grid-rows-[auto_0fr]"
          }`}
        >
          <div
            onClick={handleShowCategory}
            className="border-b-[2px] p-1 flex justify-between border-b-gray-300 cursor-pointer"
          >
            <h4 className="font-bold text-gray-700">Category</h4>
            <i
              className={`bx bxs-chevron-up transition-all duration-700 ${
                isShowCategory && "rotate-[180deg]"
              } self-center text-end text-xl text-gray-600`}
            ></i>
          </div>

          <CategoriesList />
        </div>
      </aside>
      {isShowFilters && (
        <div
          onClick={handleShowFilters}
          className="fixed min-[871px]:hidden top-0 left-0 bottom-0 right-0 bg-black/40 z-30"
        ></div>
      )}

      <div className="block w-full">
        <div
          style={{ scrollbarWidth: "none" }}
          className="pb-9 flex items-center max-[870px]:w-[100vw] max-[870px]:-left-5 max-[870px]:px-5  max-[870px]:relative max-[870px]:overflow-x-auto font-semibold"
        >
          <button
            onClick={handleShowFilters}
            className="flex-shrink-0 min-[871px]:hidden bg-slate-700/10 rounded-2xl flex gap-1 px-3 justify-center items-center text-gray-700"
          >
            <i className="bx bx-filter text-xl cursor-pointer h-full flex items-center"></i>
            <span> Sort and filter</span>
            {filtersActive.length > 0 && <span>({filtersActive.length})</span>}
          </button>
          <FiltersActive />
        </div>
        {products.length ? (
          filteredProducts.length ? (
            <ProductsList products={filteredProducts} />
          ) : (
            <NoResultsFound productName={productName} />
          )
        ) : (
          <LoadingProducts />
        )}
      </div>
    </div>
  );
};
export default Home;
