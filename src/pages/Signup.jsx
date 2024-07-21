import { useForm } from "react-hook-form";
import { axiosEcommerce } from "../utils/configAxios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toastError, toastsuccess } from "../utils/toast/toastModal";

const Signup = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  console.log(errors);
  let Navigate = useNavigate();

  const submit = (dataForm) => {
    axiosEcommerce
      .post("/users", dataForm)
      .then((data) => {
        Navigate("/login");
        toastsuccess(data.statusText, "signupSuccess");
      })
      .catch((err) => {
        toastError(err.response.data.error, "signupError");
        console.log(err);

      });
  };

  return (
    <section className="bg-gray-100 font-[Yantramanav] text-gray-600 grid min-h-screen py-[90px] place-items-center px-2">
      <form
        onSubmit={handleSubmit(submit)}
        className="grid gap-6 p-4 bg-white rounded-xl w-full max-w-[350px]"
      >
        <h3 className="font-semibold text-2xl">Sign Up</h3>
        <div className="grid gap-2">
          <label className="text-sm" htmlFor="firstName">
            First name
          </label>
          <input
            {...register("firstName")}
            className="border border-gray-300 outline-none p-2 rounded-md"
            id="firstName"
            type="text"
            required
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm" htmlFor="lastName">
            Last name
          </label>
          <input
            {...register("lastName")}
            className="border border-gray-300 outline-none p-2 rounded-md"
            id="lastName"
            type="text"
            required
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm" htmlFor="email">
            Email
          </label>
          <input
            {...register("email", {
              pattern: /^[a-z\d][a-z\d\-._]+@[a-z]+\.[a-z]+$/i,
            })}
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
            {...register("password", {
              pattern: {
                value: /^(?=.*[\W|_1|\d])\S{8,}$/,
                message: "the password contains at least 8",
              },
            })}
            className="border border-gray-300 outline-none p-2 rounded-md"
            id="password"
            type="password"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm" htmlFor="phone">
            Phone (10 characters)
          </label>
          <input
            {...register("phone")}
            className="border border-gray-300 outline-none p-2 rounded-md"
            id="phone"
            type="number"
            required
          />
        </div>

        <button title="login" className="block w-full py-2 bg-red-500 text-white hover:bg-red-600 transition-colors">
          login
        </button>
        <span className="text-sm">
          Already have an account?
          <button title="login page" type="button" className="text-blue-400">
            Log in
          </button>
        </span>
      </form>
    </section>
  );
};
export default Signup;
