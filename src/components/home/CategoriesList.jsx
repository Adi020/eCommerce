import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getCategories,
  setIdCheckedCategories,
} from "../../store/slices/productsInfo.slice";
import Category from "./Category";

const CategoriesList = () => {
  const { categories } = useSelector((store) => store.productsInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!categories.length) {
      dispatch(getCategories());
    }
  }, []);

  useEffect(() => {
    dispatch(setIdCheckedCategories());
  }, [categories]);

  return (
    <article className="overflow-hidden">
      <form className="grid gap-4 p-2">
        {categories.map((category) => (
          <Category key={category.id} category={category} />
        ))}
      </form>
    </article>
  );
};
export default CategoriesList;
