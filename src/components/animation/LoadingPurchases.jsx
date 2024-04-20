const LoadingPurchases = () => {
  return (
    <section className="grid gap-14 px-4">
      {[...Array(5)].map((_, i) => (
        <article
          key={i}
          className="grid grid-cols-2 max-[639px]:grid-cols-[2fr,1fr] gap-2 text-sm items-center"
        >
          {/*seccion izquierda*/}
          <section className="flex items-center gap-7">
            <div className="h-[80px] bg-[#d9d9d9] relative overflow-hidden img-loading w-[80px]"></div>
            <div className="bg-[#d9d9d9] h-[20px] w-[40%] rounded-xl relative overflow-hidden title-loading"></div>
          </section>
          {/*seccion derecha*/}
          <section className="grid text-center place-items-center sm:grid-cols-3">
            <div className="h-[20px] bg-[#d9d9d9] self-center relative overflow-hidden w-[70%] rounded-xl description-loading"></div>
            <div className="bg-[#d9d9d9] h-[30px] relative overflow-hidden w-[70%] rounded-xl description-loading"></div>
            <div className="h-[20px] bg-[#d9d9d9] place-content-end w-[40%] self-center relative overflow-hidden rounded-xl description-loading"></div>
          </section>
        </article>
      ))}
    </section>
  );
};
export default LoadingPurchases;
