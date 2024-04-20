import { createSlice } from "@reduxjs/toolkit";
import { axiosEcommerce, getConfig } from "../../utils/configAxios";
import { Slide, Zoom, toast } from "react-toastify";

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
      toast.error(err.response.data.error, {
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Zoom,
      });
      console.log(err);
    });
};

export const addProductCart = (data) => (dispatch) => {
  axiosEcommerce
    .post("/cart", data, getConfig())
    .then(() => dispatch(getCartProducts()))
    .catch((err) => {
      toast.error(err.response.data.error, {
        toastId: `addProductToast-${data.productId}`,
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(err);
    });
};

export const deleteProductCart = (productId) => (dispatch) => {
  axiosEcommerce
    .delete(`/cart/${productId}`, getConfig())
    .then(() => dispatch(getCartProducts()))
    .catch((err) => {
      toast.error(err.response.data.error, {
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Zoom,
      });
      console.log(err);
    });
};

export const updateProductCart = (productId, quantity) => (dispatch) => {
  axiosEcommerce
    .put(`/cart/${productId}`, quantity, getConfig())
    .then(({ data }) => dispatch(getCartProducts()))
    .catch((err) => {
      toast.error(err.response.data.error, {
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Zoom,
      });
      console.log(err);
    });
};

export const checkoutCart = () => (dispatch) => {
  axiosEcommerce
    .post("/purchases", {}, getConfig())
    .then(() => dispatch(getCartProducts()))
    .catch((err) => {
      toast.error(err.response.data.error, {
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Zoom,
      });
      console.log(err);
    });
};

export default cartSlice.reducer;
