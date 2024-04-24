import React from "react";
import dynamic from "next/dynamic";
import { toast, type ToastPosition } from "react-toastify";
const ToastContainer = dynamic(() => import('react-toastify').then((module) => module.ToastContainer), {
  ssr: false, // Disable server-side rendering
});

const options = {
  position: "top-right" as ToastPosition,
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const showSuccess = (message: string) => toast.success(message, options);
const showWarning = (message: string) => toast.warning(message, options);
const showInfo = (message: string) => toast.info(message, options);
const showError = (message: string) => toast.error(message, options);

export const LazyToastContainer = () => (
  <ToastContainer {...options} />
);

export { ToastContainer, showSuccess, showWarning, showInfo, showError };
