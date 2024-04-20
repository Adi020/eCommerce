const LoadingProductDetail = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 items-center">
      <div className="overflow-hidden img-loading flex relative h-[300px] w-full bg-[#d9d9d9] min-[1100px]:mx-[50px]"></div>
      <div className="grid gap-10 min-[1100px]:mx-[50px]">
        <div className="sm:order-1">
          <div className="bg-[#d9d9d9] w-[30%] mb-1 h-[25px] relative overflow-hidden title-loading rounded-xl"></div>
          <div className="bg-[#d9d9d9] w-[80%] ml-2 h-[25px] relative overflow-hidden title-loading rounded-xl"></div>
        </div>

        <div className="grid grid-cols-2 sm:order-3">
          <div>
            <div className="bg-[#d9d9d9] w-[30%] mb-1 h-[25px] relative rounded-xl overflow-hidden title-loading"></div>
            <div className="bg-[#d9d9d9] w-[80%] ml-2 h-[25px] relative rounded-xl overflow-hidden title-loading"></div>
          </div>

          <div className="bg-[#d9d9d9] relative overflow-hidden title-loading w-[40%] mb-1 h-[25px] rounded-xl"></div>
        </div>

        <div className="block w-full py-4 bg-[#d9d9d9] relative btn-loading h-[56px] transition-colors sm:order-4"></div>
        <div className="sm:order-2 grid gap-1">
          <div className=" bg-[#d9d9d9] w-[80%] relative overflow-hidden ml-2 h-[25px] rounded-xl description-loading"></div>
          <div className="bg-[#d9d9d9] w-[80%] relative overflow-hidden ml-2 h-[25px] rounded-xl description-loading"></div>
          <div className=" bg-[#d9d9d9] w-[80%] relative overflow-hidden ml-2 h-[25px] rounded-xl description-loading"></div>
        </div>
      </div>
    </div>
  );
};
export default LoadingProductDetail;
