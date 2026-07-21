import { ReactNode } from "react";

export default function Modal({
  open,
  title,
  onClose,
  children,
  footer,
  width = "max-w-lg",
}) {
  if (!open) return null;

  return (
    // px-4 ở đây (thay vì mx-4 trên div con kết hợp w-full) — w-full + mx-4
    // khiến div con rộng 100% + 2*margin, tràn ra ngoài viewport và gây
    // scroll ngang toàn trang trên mobile khi mở modal.
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div
        className={`w-full rounded-2xl bg-white shadow-xl ${width} relative max-h-[90vh] overflow-y-auto`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-xl leading-none text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-4">{children}</div>

        {/* Footer */}
        {footer && <div className="border-t p-4">{footer}</div>}
      </div>
    </div>
  );
}
