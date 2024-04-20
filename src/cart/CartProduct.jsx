import { useDispatch } from "react-redux";
import {
  deleteProductCart,
  updateProductCart,
} from "../store/slices/cart.slice";

const CartProduct = ({ cartProduct }) => {
  const dispatch = useDispatch();

  const totalPrice = (cartProduct.quantity * cartProduct.product.price).toFixed(
    2
  );
  const handleIncremenQuantity = () => {
    dispatch(
      updateProductCart(cartProduct.id, {
        quantity: cartProduct.quantity + 1,
      })
    );
  };

  const handleDecrementQuantity = () => {
    if (cartProduct.quantity - 1 === 0) {
      dispatch(deleteProductCart(cartProduct.id));
    } else {
      dispatch(
        updateProductCart(cartProduct.id, {
          quantity: cartProduct.quantity - 1,
        })
      );
    }
  };

  const handleClickDelete = () => {
    dispatch(deleteProductCart(cartProduct.id));
  };
  return (
    <article className="grid p-2 grid-cols-[auto_1fr_auto] grid-rows-[1fr_auto] gap-y-2">
      <div className="h-[90px] grid place-items-center aspect-square p-2">
        <img
          className="w-full h-full object-contain"
          src={cartProduct.product.images[0].url}
          alt=""
        />
      </div>
      <div>
        <span className="text-sm line-clamp-2">
          {cartProduct.product.title}
        </span>
        <article>
          <h5 className="text-sm text-gray-300 font-semibold">Quantity</h5>
          <div className="flex border max-w-max font-semibold text-gray-600">
            <button
              onClick={handleDecrementQuantity}
              className="w-[30px] pb-2 aspect-square border"
            >
              -
            </button>
            <div className="px-5 border">{cartProduct.quantity}</div>
            <button
              onClick={handleIncremenQuantity}
              className="w-[30px] pb-2 aspect-square border"
            >
              +
            </button>
          </div>
        </article>
      </div>
      <i
        onClick={handleClickDelete}
        className="bx bxs-trash self-center text-red-400 cursor-pointer"
      ></i>
      <div className="col-span-3 text-end">
        <span className="text-end text-xs text-gray-400">Total:</span>
        <span className="px-2 text-sm font-bold text-gray-700">
          $ {totalPrice}
        </span>
      </div>
    </article>
  );
};
export default CartProduct;
