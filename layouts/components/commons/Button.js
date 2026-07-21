import React from "react";

export default function Button({
  children,
  loading = false,
  disabled,
  className = "",
  // Mặc định type="button" để tránh double-submit: các form trong dự án này
  // đều tự gọi handleSubmit() qua onClick, nếu button nằm trong thẻ <form>
  // (Formik <Form>) và không set type thì trình duyệt mặc định type="submit",
  // khiến sự kiện submit gốc bắn thêm 1 lần → gọi API 2 lần liên tiếp.
  type = "button",
  ...props
}) {
  const base =
    "relative inline-flex items-center justify-center w-full text-white font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-0 rounded-full";

  const style = "border border-transparent ";

  const disabledStyle =
    disabled || loading ? "opacity-70 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      {...props}
      disabled={disabled || loading}
      className={`${base} ${style} ${disabledStyle} ${className} px-6 py-2.5 text-base`}
    >
      {loading ? (
        <svg
          className="mr-2 h-4 w-4 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
}
