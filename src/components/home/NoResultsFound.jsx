import notFoundImg from "../../../public/icons/no-results.png";

const NoResultsFound = ({ productName }) => {
  return (
    <section className="flex py-7 flex-col items-center gap-4 font-medium text-gray-800 text-xl">
      <div className="h-[100px] aspect-square">
        <img
          className="w-full h-full object-contain"
          src={notFoundImg}
          alt="product not found"
        />
      </div>
      {productName ? (
        <div className="grid">
          <span className="text-center">
            We didn't find anything related to:
          </span>
          <span className="font-bold text-4xl text-center">{productName}</span>
          <span className="pt-2 text-center">
            try to improve your request...
          </span>
        </div>
      ) : (
        <div className="grid">
          <span className="text-center">we couldn't find any results</span>
          <span className="pt-2 text-center">
            try to improve your filters...
          </span>
        </div>
      )}
    </section>
  );
};
export default NoResultsFound;
