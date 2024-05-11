import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser, logout } from "../store/slices/userInfo.slice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { token, user } = useSelector((store) => store.userInfo);

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  let Navigate = useNavigate();

  const submit = (dataForm) => {
    dispatch(loginUser(dataForm));
  };

  const handleClickLogout = () => {
    dispatch(logout());
  };

  const handleNavigateSignup = () => {
    Navigate("/signup");
  };

  return (
    <section className="bg-gray-100 grid min-h-screen py-[90px] place-items-center px-2 text-gray-600">
      {token ? (
        <section className="bg-white rounded-xl p-4 w-[300px] grid gap-6 text-center">
          <i className="bx bxs-user-circle text-8xl"></i>
          <span className="font-bold">
            {user.firstName} {user.className}
          </span>
          <button
            onClick={handleClickLogout}
            className="block w-full py-2 bg-red-500 text-white hover:bg-red-600 transition-colors rounded-md"
          >
            Logout
          </button>
        </section>
      ) : (
        <form
          onSubmit={handleSubmit(submit)}
          className="grid gap-6 p-4 bg-white rounded-xl max-w-[350px]"
        >
          <h3 className="font-semibold text-xl">
            Welcome! Enter your email and password to continue
          </h3>
          <section className="py-2 p-4 bg-cyan-200 rounded-md">
            <h5 className="text-center mb-4 font-bold">Test data</h5>
            <div className="flex items-center gap-2">
              <i className="bx bx-envelope"></i>
              <span>john@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="bx bx-lock-alt"></i>
              <span>john1234</span>
            </div>
          </section>
          <div className="grid gap-2">
            <label className="text-sm" htmlFor="email">
              Email
            </label>
            <input
              {...register("email")}
              className="border border-gray-300 outline-none p-2 rounded-md"
              id="email"
              type="email"
              required
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm" htmlFor="password">
              Password
            </label>
            <input
              {...register("password")}
              className="border border-gray-300 outline-none p-2 rounded-md"
              id="password"
              type="password"
              required
            />
          </div>
          <button onClick={() => console.log("se hizo submit")} className="block w-full py-2 bg-red-500 text-white hover:bg-red-600 transition-colors">
            login
          </button>
          <span className="text-sm">
            Don´t have an account?{" "}
            <button
              onClick={handleNavigateSignup}
              type="button"
              className="text-blue-400"
            >
              Sign up
            </button>
          </span>
        </form>
      )}
    </section>
  );
};
export default Login;
