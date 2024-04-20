import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosEcommerce } from "../utils/configAxios";
import ProductsList from "../components/home/ProductsList";
import { addProductCart } from "../store/slices/cart.slice";
import { useDispatch } from "react-redux";
import LoadingProductDetail from "../components/animation/LoadingProductDetail";
import LoadingProducts from "../components/animation/LoadingProducts";

const ProductDetail = () => {
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [indexImageToShow, setIndexImageToShow] = useState(1);

  const { id } = useParams();
  const dispatch = useDispatch();

  const handleClickPlus = () => setQuantity(quantity + 1);
  const handleClickLess = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleClickNextImage = () => {
    if (indexImageToShow < productImages.length) {
      setIndexImageToShow(indexImageToShow + 1);
    } else setIndexImageToShow(1);
  };
  const handleClickPreviusImage = () => {
    if (indexImageToShow > 1) {
      setIndexImageToShow(indexImageToShow - 1);
    } else setIndexImageToShow(productImages.length);
  };

  const handleClickAddToProduct = () => {
    const productToAdd = {
      quantity,
      productId: product.id,
    };
    dispatch(addProductCart(productToAdd));
  };

  useEffect(() => {
    axiosEcommerce
      .get(`/products/${id}`)
      .then(({ data }) => {
        setProduct(data);
        setProductImages(data.images);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (product) {
      axiosEcommerce
        .get(`/products?categoryId=${product.categoryId}`)
        .then(({ data }) => {
          const productsFiltered = data.filter(
            (item) => item.id !== product.id
          );
          setSimilarProducts(productsFiltered);
        })
        .catch((err) => console.log(err));
    }
  }, [product]);

  return (
    <section className="p-5 max-w-[1280px] py-[90px] mx-auto">
      <section className="flex text-sm text-gray-600 gap-2 py-3 items-center">
        <Link className="font-semibold " to={"/"}>
          Home
        </Link>
        <div className="h-[4px] aspect-square rounded-full bg-red-500 translate-y-1/2"></div>
        <span className="font-bold truncate w-[200px]">{product?.title}</span>
      </section>
      {product ? (
        <section className="grid gap-6 sm:grid-cols-2 items-cente">
          <div className="grid place-items-center relative">
            {/*Slider*/}
            <article className="overflow-hidden relative min-[1100px]:mx-[50px]">
              <ul
                className="flex"
                style={{ width: `${productImages.length * 100}%` }}
              >
                {productImages.map((image) => (
                  <li
                    key={image.url}
                    className="h-[300px]"
                    style={{
                      width: `calc(100% / ${productImages.length})`,
                      transition: "transform 0.3s ease",
                      transform: `translateX(-${
                        (indexImageToShow - 1) * 100
                      }%)`,
                    }}
                  >
                    <img
                      className="w-full h-full object-contain"
                      src={image.url}
                      alt=""
                    />
                  </li>
                ))}
              </ul>
              <button
                onClick={handleClickPreviusImage}
                className="absolute top-1/2 left-2 text-2xl bg-red-500 h-[40px] aspect-square rounded-full text-white -translate-y-1/2"
              >
                <i className="bx bx-chevron-left"></i>
              </button>
              <button
                onClick={handleClickNextImage}
                className="absolute top-1/2 right-2 text-2xl bg-red-500 h-[40px] aspect-square rounded-full text-white -translate-y-1/2"
              >
                <i className="bx bx-chevron-right"></i>
              </button>
            </article>

            <article className="max-[639px]:absolute bottom-0">
              <ul className="flex justify-center sm:gap-4 gap-2">
                {productImages.map((productImage, i) => (
                  <li
                    onMouseEnter={() => setIndexImageToShow(i + 1)}
                    className={`sm:w-[70px] sm:rounded-md  rounded-full max-[639px]:w-[7px] max-[639px]:border aspect-square sm:overflow-hidden cursor-pointer ${
                      i === indexImageToShow - 1
                        ? "border-[2px] border-red-400  max-[639px]:bg-gray-400"
                        : "max-[639px]:bg-gray-300"
                    }`}
                    key={productImage.url}
                  >
                    <img
                      className="w-full h-full object-contain max-[639px]:hidden"
                      src={productImage.url}
                      alt=""
                    />
                  </li>
                ))}
              </ul>
            </article>
          </div>

          {/*detalles del producto*/}
          <article className="grid gap-10 min-[1100px]:mx-[50px]">
            <div className="sm:order-1">
              <h4 className="text-gray-400 font-semibold">{product?.brand}</h4>
              <span className="font-bold text-gray-600 text-xl ml-2 block">
                {product?.title}
              </span>
            </div>

            <section className="grid grid-cols-2 sm:order-3">
              <article>
                <h4 className="text-gray-300 font-semibold">Price</h4>
                <span className=" font-bold text-gray-600 block text-lg ml-2">
                  $ {product?.price}
                </span>
              </article>

              <article>
                <h5 className="text-sm text-gray-300 font-semibold">
                  Quantity
                </h5>
                <div className="flex border max-w-max font-semibold text-gray-600">
                  <button
                    className="w-[30px] pb-2 aspect-square border"
                    onClick={handleClickLess}
                  >
                    -
                  </button>
                  <div className="px-5 border">{quantity}</div>
                  <button
                    className="w-[30px] pb-2 aspect-square border"
                    onClick={handleClickPlus}
                  >
                    +
                  </button>
                </div>
              </article>
            </section>
            <button
              onClick={handleClickAddToProduct}
              className="block w-full py-4 bg-red-500 text-white hover:bg-red-600 transition-colors sm:order-4"
            >
              Add to Cart <i className="bx bx-cart"></i>
            </button>

            <p className="text-sm sm:order-2 font-semibold text-gray-600">
              {product?.description}
            </p>
          </article>
        </section>
      ) : (
        <LoadingProductDetail />
      )}

      <section className="pt-8">
        <h3 className="font-bold text-red-500/85">
          Discover Similiar Products
        </h3>
        <div className="px-2 py-5">
          {similarProducts.length ? (
            <ProductsList products={similarProducts} />
          ) : (
            <LoadingProducts />
          )}
        </div>
      </section>
    </section>
  );
};
export default ProductDetail;
