import { Link } from "react-router-dom";

const Route = (nameRoute) => {
  return (
    <section className="flex text-sm text-gray-600 gap-2 items-center">
      <Link className="font-semibold " to={"/"}>
        Home
      </Link>
      <div className="h-[4px] aspect-square rounded-full bg-red-500 translate-y-1/2"></div>
      <span className="font-bold truncate w-[200px]">{nameRoute}</span>
    </section>
  );
};
export default Route;
