const LoadingProducts = () => {
  return (
    <section className="grid w-full rounded-md grid-cols-[repeat(auto-fill,_minmax(230px,_1fr))] gap-7">
      {[...Array(4)].map((_, i) => (
        <article key={i} className="border rounded-md overflow-hidden min-h-[400px] relative">
          <div className="img-loading h-[200px] bg-[#d9d9d9] overflow-hidden p-4 relative border-b-[1px] border-t-gray-500 group"></div>
          <section className="grid p-5 gap-6">
            <div className="grid gap-1">
              <div className="font-semibold relative overflow-hidden bg-[#d9d9d9] h-[20px] w-[40%] rounded-xl title-loading"></div>
              <div className="ml-2 font-semibold relative overflow-hidden bg-[#d9d9d9] h-[20px] w-[40%] rounded-xl title-loading"></div>
            </div>
            <div className="grid gap-1">
              <div className="font-semibold bg-[#d9d9d9] overflow-hidden relative h-[20px] w-[40%] rounded-xl title-loading"></div>
              <div className="ml-2 font-semibold bg-[#d9d9d9] overflow-hidden relative h-[20px] w-[40%] rounded-xl title-loading"></div>
            </div>
            <div className="absolute bottom-7 right-7 rounded-full overflow-hidden w-[50px] aspect-square">
              <div className="btn-loading bg-[#d9d9d9]"></div>
            </div>
          </section>
        </article>
      ))}
    </section>
  );
};
export default LoadingProducts;
