"use client"
import { useEffect } from 'react'

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div className="fixed top-5 right-5 z-50 bg-zinc-100 rounded-md shadow-lg px-4 py-3 flex items-center gap-3 max-w-sm animate-slide-in">
      <p className={`text-sm flex-1 font-medium ${
        isSuccess
          ? "bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          : "text-red-600"
      }`}>
        {message}
      </p>
      <button
        onClick={onClose}
        className="text-zinc-500 hover:text-zinc-700 transition-colors text-lg leading-none cursor-pointer"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;