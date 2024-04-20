import { Link, useNavigate } from "react-router-dom";
import { addProductCart } from "../../store/slices/cart.slice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Product = ({ product }) => {
  const { token } = useSelector((store) => store.userInfo);

  const dispatch = useDispatch();
  const Navigate = useNavigate()
  const handleClickAddProduct = (e) => {
    e.preventDefault();
    if (token) {
      const productToAdd = { quantity: 1, productId: product.id };
      dispatch(addProductCart(productToAdd));
    } else Navigate("/login");
  };

  return (
    <Link to={`/products/${product.id}`}>
      <article className="border rounded-md min-h-[400px] relative">
        <div className="h-[200px] overflow-hidden p-4 relative border-b-[1px] border-t-gray-500 group">
          <img
            className="h-full w-full object-contain opacity-100 group-hover:opacity-0 transition-opacity ease-in duration-300"
            src={product.images[0].url}
            alt=""
          />
          <div className="absolute p-4 top-0 left-0 w-full h-full">
            <img
              className="w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-300"
              src={product.images[1].url}
              alt=""
            />
          </div>
        </div>

        <section className="grid p-5 gap-6">
          <div>
            <h4 className="font-semibold text-gray-400">{product.brand}</h4>
            <span className="pl-2 font-bold text-gray-600 line-clamp-2">
              {product.title}
            </span>
          </div>

          <div>
            <h4 className="font-medium text-gray-400">Price</h4>
            <span className="pl-2 font-bold text-gray-600">
              ${product.price}
            </span>
          </div>
        </section>
        <button
          className="absolute bottom-7 right-7 bg-red-500 hover:bg-red-400 rounded-full w-[50px] aspect-square text-white"
          onClick={handleClickAddProduct}
        >
          <i className="bx bx-cart text-2xl"></i>
        </button>
      </article>
    </Link>
  );
};
export default Product;
