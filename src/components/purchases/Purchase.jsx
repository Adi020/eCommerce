import { Link } from "react-router-dom";
import { formatDDMMYYYY } from "../../utils/date";

const Purchase = ({ purchase }) => {
  const totalPrice = (purchase.product.price * purchase.quantity).toFixed(2);
  return (
    <Link to={`/products/${purchase.productId}`}>
      <article className="grid w-full grid-cols-2 max-[639px]:grid-cols-[2fr,1fr] gap-2 text-sm items-center">
        {/*seccion izquierda*/}
        <section className="flex items-center gap-7">
          <div className="h-[80px] aspect-square">
            <img
              className="h-full w-full object-contain"
              src={purchase.product.images[0].url}
              alt=""
            />
          </div>
          <span>{purchase.product.title}</span>
        </section>
        {/*seccion derecha*/}
        <section className="grid text-center justify-center font-semibold sm:grid-cols-3">
          <span className="text-xs text-gray-400">
            {formatDDMMYYYY(purchase.createdAt)}
          </span>
          <span className="p-1 px-4 border border-l-gray-400">
            {purchase.quantity}
          </span>
          <span className="font-bold text-end">${totalPrice}</span>
        </section>
      </article>
    </Link>
  );
};
export default Purchase;
