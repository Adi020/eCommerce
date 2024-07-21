import { toast, Zoom } from "react-toastify";

export const toastsuccess = (message, toastId, autoClose) => {
  toast.success(message, {
    toastId,
    autoClose,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Zoom,
  });
};

export const toastError = (message, toastId, autoClose) => {
  toast.error(message, {
    toastId,
    position: "top-center",
    autoClose: autoClose | 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const toastPromise = (promise, pending, toastId, delay) => {
  toast.promise(
    promise,
    {
      pending,
      success: "Successfully brought",
      error: "An error occurred, please try again later.",
    },
    {
      toastId,
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Zoom,
      delay: delay || 0,
    }
  );
};
