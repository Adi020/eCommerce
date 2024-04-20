import Product from "../home/Product";

const ProductsList = ({ products }) => {
  return (
    <section className="grid w-full rounded-md grid-cols-[repeat(auto-fill,_minmax(230px,_1fr))] gap-7">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </section>
  );
};
export default ProductsList;
