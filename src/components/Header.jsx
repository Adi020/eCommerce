import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCheckedCategories,
  setPriceFilter,
  setProductName,
} from "../store/slices/productsInfo.slice";
import { changeIsShowCart } from "../store/slices/cart.slice";
import React, { useRef } from "react";

const Header = () => {
  const { isShowCart, cartProducts } = useSelector((store) => store.cart);
  const { token } = useSelector((store) => store.userInfo);
  const { productName } = useSelector((store) => store.productsInfo);

  const refContainer = useRef();
  const dispatch = useDispatch();
  let Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentProductName = e.target.productName.value;
    dispatch(setProductName(currentProductName));
    dispatch(removeCheckedCategories());
    dispatch(setPriceFilter({ minPrice: "", maxPrice: "" }));
    Navigate("/");
    handleBlur();
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value
    dispatch(setProductName(inputValue));
  };
  const handleBlur = () => {
    if (document.activeElement) {
      document.activeElement.blur();
      dispatch(setProductName(productName.trim());
    }
  };

  const handleClickBlur = () => {
    handleBlur();
    dispatch(setProductName(""));
  };

  const handleClickResetInput = () => dispatch(setProductName(""));

  const handleClickShowCart = () => {
    if (token) {
      dispatch(changeIsShowCart(!isShowCart));
    } else Navigate("/login");
  };

  return (
    <header className="place-content-center fixed top-0 left-0 right-0 z-20 bg-white h-[50px] min-[930px]:h-[70px] flex items-center border-b">
      <div className="flex h-[32px] min-[930px]:h-[49px] overflow-hidden items-center justify-between w-full px-5 max-w-[1280px]">
        <form
          className="search order-3 min-[930px]:order-2 group transition-all min-w-[24px] duration-400 min-[930px]:w-[100%] min-[930px]:min-w-[30%] max-w-[600px] min-[930px]:mr-[15%] max-[1200px]:focus:mr-0 h-full  max-[1200px]:focus-within:min-w-[100%]"
          onSubmit={handleSubmit}
          ref={refContainer}
          tabIndex="0"
        >
          <div className="flex h-full max-[929px]:w-[24px] max-[1200px]:focus-within:w-full items-center relative overflow-hidden">
            <i className="bx bx-search text-gray-600 absolute text-2xl min-[930px]:pl-2 group-focus-within:pl-2"></i>
            <div className="z-20 h-full font-semibold w-full">
              <input
                autoComplete="off"
                value={productName}
                onChange={handleInputChange}
                id="productName"
                placeholder="Search"
                className="h-full min-[930px]:border w-full bg-transparent border-gray-500 outline-none px-8"
                type="text"
              />
            </div>
            <button
              type="button"
              onClick={handleClickBlur}
              className="absolute right-0 min-[930px]:hidden invisible group-focus-within:visible group-focus-within:z-20"
            >
              <i className="bx bx-x text-3xl font-sm min-[930px]:pr-1 text-gray-600"></i>
            </button>
            <button
              type="button"
              onClick={handleClickResetInput}
              className="absolute right-0 max-[929px]:hidden invisible group-focus-within:visible group-focus-within:z-20"
            >
              <i className="bx bx-x text-3xl font-sm min-[930px]:pr-1 text-gray-600"></i>
            </button>
          </div>
        </form>
        <Link
          className="text-red-500 order-1 transition-all duration-200 pr-[20px] font-extrabold min-[930px]:text-[32px] max-[929px]:text-[25px] font-['Yantramanav']"
          to="/"
        >
          <span className="block max-[340px]:min-w-[140px] min-w-[165px]">
            e-commerce
          </span>
        </Link>
        <div className="max-[929px]:order-2 min-[930px]:hidden flex-grow-[1]"></div>
        <nav
          className={`flex transition-all duration-200 justify-end max-[929px]:ml-1 max-[929px]:gap-2 ${
            token ? "gap-6" : "gap-2"
          } order-4 min-[930px]:order-3  min-[930px]:min-w-[241px]`}
        >
          <button
            className="hover:text-red-400 relative text-gray-600 flex items-center transition-colors duration-200"
            onClick={handleClickShowCart}
          >
            <i className="bx bx-cart text-2xl "></i>
            {cartProducts.length > 0 && (
              <span className="flex text-center justify-center items-center font-bold text-xs absolute top-0 text-white -right-1 h-[15px] aspect-square bg-red-500 rounded-full">
                {cartProducts.length}
              </span>
            )}
          </button>

          <Link
            className="flex items-center hover:text-red-400 text-gray-600 transition-colors duration-200"
            to="/purchases"
          >
            <i className="bx bx-box text-2xl "></i>
          </Link>
          <Link
            className="flex items-center hover:text-red-400 text-gray-600 transition-colors duration-200"
            to="/login"
          >
            <i className="bx bx-user text-2xl"></i>
            {token ? null : (
              <span className="px-2 max-[929px]:hidden">Log in</span>
            )}
          </Link>
          {!token && (
            <>
              <span className="flex items-center text-normal max-[929px]:hidden text-gray-600">
                |
              </span>
              <Link
                to={"/signup"}
                className="min-[930px]:px-2 max-[929px]:hidden flex items-center hover:text-red-400 text-gray-600 transition-colors duration-200"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
export default Header;
