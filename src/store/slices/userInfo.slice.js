import { createSlice } from "@reduxjs/toolkit";
import { axiosEcommerce, getConfig } from "../../utils/configAxios";
import { toastError } from "../../utils/toast/toastModal";

const initialState = {
  cartProducts: [],
  isShowCart: false,
};
const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    changeIsShowCart: (state) => {
      state.isShowCart = !state.isShowCart;
    },
    setCartProducts: (state, action) => {
      const newCartProducts = action.payload;
      state.cartProducts = newCartProducts;
    },
    removeCartProducts: () => {
      return initialState;
    },
  },
});

export const { changeIsShowCart, setCartProducts, removeCartProducts } =
  cartSlice.actions;

export const getCartProducts = () => (dispatch) => {
  axiosEcommerce
    .get("/cart", getConfig())
    .then(({ data }) => dispatch(setCartProducts(data)))
    .catch((err) => {
      toastError(err.response.data.error, "cartProductsErrorToast");
      console.log(err);
    });
};

export const addProductCart = (data) => (dispatch) => {
  axiosEcommerce
    .post("/cart", data, getConfig())
    .then(() => dispatch(getCartProducts()))
    .catch((err) => {
      toastError(
        err.response.data.error,
        `addProductErrorToast-${data.productId}`
      );
      console.log(err);
    });
};

export const deleteProductCart = (productId) => (dispatch) => {
  axiosEcommerce
    .delete(`/cart/${productId}`, getConfig())
    .then(() => dispatch(getCartProducts()))
    .catch((err) => {
      toastError(
        err.response.data.error,
        `deleteProductToastError-${productId}`
      );
      console.log(err);
    });
};

export const updateProductCart = (productId, quantity) => (dispatch) => {
  axiosEcommerce
    .put(`/cart/${productId}`, quantity, getConfig())
    .then(({ data }) => dispatch(getCartProducts()))
    .catch((err) => {
      toastError(
        err.response.data.error,
        `updateProductToastError-${productId}`
      );
      console.log(err);
    });
};

export const checkoutCart = () => (dispatch) => {
  axiosEcommerce
    .post("/purchases", {}, getConfig())
    .then(() => dispatch(getCartProducts()))
    .catch((err) => {
      toastError(err.response.data.err, "purchaseProductsToastError");
      console.log(err);
    });
};

export default cartSlice.reducer;
