import { createSlice } from "@reduxjs/toolkit";
import { axiosEcommerce } from "../../utils/configAxios";
import { toast } from "react-toastify";
import { toastError } from "../../utils/toast/toastModal";

const initialState = {
  token: "",
  user: null,
  err: null,
};

const userInfoSlice = createSlice({
  initialState: JSON.parse(localStorage.getItem("userInfo")) ?? initialState,
  name: "userInfo",
  reducers: {
    setUserInfo: (state, actions) => {
      const response = actions.payload;
      const newState = { ...state, ...response };
      localStorage.setItem("userInfo", JSON.stringify(newState));
      return newState;
    },
    logout: (state) => {
      const newState = { ...state, ...initialState };
      localStorage.setItem("userInfo", JSON.stringify(newState));
      return initialState;
    },
  },
});

export const { setUserInfo, logout, setErr } = userInfoSlice.actions;

export const loginUser = (dataForm) => (dispatch) => {
  axiosEcommerce
    .post("/users/login", dataForm)
    .then(({ data }) => {
      dispatch(setUserInfo(data));
    })
    .catch((err) => toastError(err.response.data.error, "loginError", 4000));
};

export default userInfoSlice.reducer;
