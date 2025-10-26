import { useField } from "formik";

export default function Input({ label, ...props }) {
  const [field, meta] = useField(props.name);

  return (
    <div className="mb-4 flex flex-col">
      {label && (
        <label
          htmlFor={props.name}
          className="mb-1 text-sm font-bold text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        {...field}
        {...props}
        id={props.name}
        className={`rounded-lg border px-3 py-2 text-sm outline-none transition-all 
          ${
            meta.touched && meta.error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-blue-500"
          } ${props.className || ""}`}
      />

      {meta.touched && meta.error && (
        <span className="mt-1 text-xs text-red-500">{meta.error}</span>
      )}
    </div>
  );
}
