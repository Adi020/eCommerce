import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeIsShowCart,
  checkoutCart,
  getCartProducts,
  removeCartProducts,
} from "../store/slices/cart.slice";
import CartProduct from "./CartProduct";

const Cart = () => {
  const { isShowCart, cartProducts } = useSelector((store) => store.cart);
  const { token } = useSelector((store) => store.userInfo);

  const dispatch = useDispatch();

  const handleClickCheckout = () => {
    dispatch(checkoutCart());
  };

  const totalPriceCheckout = cartProducts.reduce(
    (acc, cartProduct) =>
      acc + cartProduct.quantity * cartProduct.product.price,
    0
  );

  const handleIsShowCart = () => {
    dispatch(changeIsShowCart(!isShowCart));
  };

  useEffect(() => {
    if (token) {
      dispatch(getCartProducts());
    } else {
      dispatch(removeCartProducts());
    }
  }, [token]);

  useEffect(() => {
    if (isShowCart) {
      dispatch(getCartProducts());
    }
  }, [isShowCart]);

  return (
    <>
      <section className="relative">
        <div
          className={`z-40 fixed top-0 h-screen bg-white w-[300px] ${
            isShowCart && token ? "-right-0" : "-right-full"
          } transition-all duration-200 p-2 ease-in shadow-2xl shadow-black/30 grid grid-rows-[auto_1fr_auto]`}
        >
          <button onClick={handleIsShowCart} title="hidden cart" className="absolute top-0 right-0">
            <i className="bx bx-x text-3xl text-gray-600"></i>
          </button>
          <h3 className="font-bold text-xl">Shopping cart</h3>
          {/*productos del carrito */}
          <section className="grid gap-4 content-start overflow-y-auto">
            {cartProducts.map((cartProduct) => (
              <CartProduct key={cartProduct.id} cartProduct={cartProduct} />
            ))}
          </section>
          {/*precio total del carrito */}
          <section className="border-t-[1px] border-gray-400 p-4 grid gap-4 grid-cols-2">
            <span>Total:</span>
            <span className="text-end">{totalPriceCheckout.toFixed(2)}</span>
            <button
              onClick={handleClickCheckout}
              className="col-span-2 block w-full py-2 bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Checkout
            </button>
          </section>
        </div>
      </section>

      <div
        onClick={handleIsShowCart}
        className={`fixed ${
          isShowCart ? "visible" : "hidden"
        } top-0 left-0 bottom-0 right-0 bg-black/40 z-30`}
      ></div>
    </>
  );
};
export default Cart;
