import { useEffect, useState } from "react";
import { axiosEcommerce, getConfig } from "../utils/configAxios";
import Purchase from "../components/purchases/Purchase";
import { Link } from "react-router-dom";
import LoadingPurchases from "../components/animation/LoadingPurchases";
import { Zoom, toast } from "react-toastify";
import { toastPromise } from "../utils/toast/toastModal";

const Purchases = () => {
  const [purchasesHistory, setPurchasesHistory] = useState([]);
  const [isLoadingPurchases, setIsLoadingPurchases] = useState(true);
  useEffect(() => {
    const promise = axiosEcommerce.get("/purchases", getConfig());
    toastPromise(promise, "Bringing purchases...", "getPurchasesToast");
    promise
      .then(({ data }) => {
        const orderPurchases = data.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
        setPurchasesHistory(orderPurchases);
        setIsLoadingPurchases(false);
      })
      .catch((data) => console.log(data));
  }, []);

  return (
    <section className="max-w-[1280px] py-[90px] px-5 mx-auto grid gap-5 text-gray-700">
      <section className="flex py-3 text-sm text-gray-600 gap-2 items-center">
        <Link className="font-semibold " to={"/"}>
          Home
        </Link>
        <div className="h-[4px] aspect-square rounded-full bg-red-500 translate-y-1/2"></div>
        <span className="font-bold truncate w-[200px]">Purchases</span>
      </section>
      <h3 className="font-bold text-xl">My purchases</h3>
      {isLoadingPurchases ? (
        <LoadingPurchases />
      ) : (
        <section className="grid gap-14 pl- px-4">
          {purchasesHistory.map((purchase) => (
            <Purchase key={purchase.id} purchase={purchase} />
          ))}
        </section>
      )}
    </section>
  );
};
export default Purchases;
