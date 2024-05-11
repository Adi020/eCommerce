import { createSlice } from "@reduxjs/toolkit";
import { axiosEcommerce } from "../../utils/configAxios";
import { toast } from "react-toastify";

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
      dispatch(setUserInfo(data))
    })
    .catch((err) => {
      toast.error(err.response.data.error, {
        toastId: `loginUserError`,
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
};

export default userInfoSlice.reducer;
