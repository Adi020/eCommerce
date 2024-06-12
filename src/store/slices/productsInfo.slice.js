import { createSlice } from "@reduxjs/toolkit";
import { axiosEcommerce } from "../../utils/configAxios";
import { Zoom, toast } from "react-toastify";

const initialState = {
  products: [],
  productName: "",
  productNameFilter: "",
  categories: [],
  idCategoriesChecked: [],
  productsByCategory: {},
  filteredProducts: [],
  filtersActive: [],
  priceFilter: {
    minPrice: 0,
    maxPrice: Infinity,
    activeFilter: false,
  },
};

const productsInfoSlice = createSlice({
  initialState,
  name: "productInfo",
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProductName: (state, actions) => {
      const productName = actions.payload;
      state.productName = productName;
      state.productNameFilter = productName.trim().toLowerCase()
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    removeCheckedCategories: (state) => {
      const categories = state.categories;
      const newState = [];
      for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        newState[i] = { ...category, checked: false };
      }
      state.categories = newState;
    },
    addCheckedCategory: (state, action) => {
      const nameCategoryCheck = action.payload;
      state.categories = state.categories.map((category) => {
        if (category.name === nameCategoryCheck) {
          return { ...category, checked: !category.checked };
        }
        return category;
      });
    },
    setProductsByCategory: (state) => {
      const { productNameFilter, products, categories, priceFilter } = state;
      for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const productsFiltered = products.filter(
          (product) =>
            product.title.toLowerCase().includes(productNameFilter) &&
            product.categoryId === category.id &&
            +product.price >= priceFilter.minPrice &&
            +product.price <= priceFilter.maxPrice
        );
        state.productsByCategory[category.id] = productsFiltered;
      }
    },
    setIdCheckedCategories: (state) => {
      const { categories } = state;
      const idCheckedCategories = categories.reduce(
        (acc, category) => {
          if (category.checked) {
            acc[category.id] = true;
            acc.length++;
          }
          return acc;
        },
        { length: 0 }
      );
      state.idCategoriesChecked = idCheckedCategories;
      state.idCategoriesChecked.activeFilter = idCheckedCategories.length > 0
    },
    setProductsFilter: (state) => {
      const { productNameFilter, idCategoriesChecked, products, priceFilter } = state;
      const lowerCaseProductName = productNameFilter;
      state.filteredProducts = products.filter(
        (product) =>
          product.title.toLowerCase().includes(lowerCaseProductName) &&
          (idCategoriesChecked.length === 0 ||
            idCategoriesChecked[product.categoryId]) &&
          (!priceFilter.activeFilter ||
            (+product.price >= priceFilter.minPrice &&
              +product.price <= priceFilter.maxPrice))
      );
    },
    setFiltersActive: (state) => {
      let { productNameFilter, idCategoriesChecked, filtersActive, priceFilter } =
        state;
      const filters = ["productName", "categories", "price"];

      filters.forEach((filter) => {
        const filterIsActive = filtersActive.includes(filter);
        const shouldFilterBeActive =
          (filter === "productName" && productNameFilter) ||
          (filter === "categories" && idCategoriesChecked.activeFilter) ||
          (filter === "price" && priceFilter.activeFilter);

        if (filterIsActive && !shouldFilterBeActive) {
          filtersActive.splice(filtersActive.indexOf(filter), 1);
        } else if (!filterIsActive && shouldFilterBeActive) {
          filtersActive.push(filter);
        }
      });
      state.filtersActive = filtersActive;
    },
    setPriceFilter: (state, action) => {
      const { minPrice, maxPrice } = action.payload;
      state.priceFilter.minPrice = minPrice !== "" ? minPrice : 0;
      state.priceFilter.maxPrice = maxPrice !== "" ? maxPrice : Infinity;
      state.priceFilter.activeFilter = maxPrice !== "" || minPrice !== ""
    },
  },
});

export const {
  setProducts,
  setProductName,
  setCategories,
  setIdCheckedCategories,
  setProductsByCategory,
  removeCheckedCategories,
  addCheckedCategory,
  setProductsFilter,
  setFiltersActive,
  setPriceFilter,
} = productsInfoSlice.actions;

export const getProducts = () => (dispatch) => {
  const promise = axiosEcommerce.get(`/products`);

  toast.promise(
    promise,
    {
      pending: "Bringing products...",
      success: "Products successfully brought",
      error: "We couldn't bring the products, try again later.",
    },
    {
      toastId: "getProductsToast",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Zoom,
    }
  );

  promise
    .then(({ data }) => {
      dispatch(setProducts(data));
    })
    .catch((err) => console.log(err));
};

export const getCategories = () => (dispatch) => {
  const promise = axiosEcommerce.get("/categories");

  toast.promise(
    promise,
    {
      pending: "Bringing categories...",
      success: "Categories brought successfully.",
      error: "We couldn't bring the categories, please try again later.",
    },
    {
      toastId: "getCategoriesToast",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Zoom,
      delay: 100,
    }
  );

  promise
    .then(({ data }) => {
      dispatch(setCategories(data));
      dispatch(removeCheckedCategories());
    })
    .catch((err) => console.log(err));
};

export default productsInfoSlice.reducer;
