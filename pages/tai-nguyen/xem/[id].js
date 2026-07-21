import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { getResourceViewUrl } from "hooks/useResources";

// Trang xem PDF độc lập — tự render PDF bằng pdf.js (qua react-pdf) thay vì
// dựa vào trình xem PDF gốc của trình duyệt, để kiểm soát được việc ẩn
// sidebar/toolbar và ép mỗi trang fit đúng theo chiều rộng khung chứa.
//
// Lưu ý quan trọng nếu sau này cần sửa:
// - Dùng react-pdf@5.7.2 (không phải bản mới nhất 9.x) — bản 9.x khai báo
//   "type": "module" và gây lỗi "Object.defineProperty called on non-object"
//   khi chạy trong Next.js 13 pages router (webpack cũ, không xử lý tốt
//   package ESM-only kiểu dual export). Bản 5.x là CommonJS/UMD nên tương
//   thích ổn định hơn nhiều với setup này.
// - Lấy id thẳng từ window.location.pathname (chỉ chạy ở client, sau khi
//   mount) thay vì router.query — router.query cho route [id].js này từng
//   không ổn định (lúc có lúc không) trong môi trường dev của dự án.
// - Tự import("react-pdf") bên trong useEffect thay vì dùng next/dynamic —
//   next/dynamic từng không kích hoạt tải chunk được trong dự án này.
// pdf.js cần DOM/canvas nên toàn bộ phần render PDF chỉ chạy sau khi
// component đã mount ở client, không đụng gì lúc SSR.
const ViewResourcePage = () => {
  const [id, setId] = useState(null);
  const [pdfApi, setPdfApi] = useState(null); // { Document, Page, pdfjs }
  const [loadError, setLoadError] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const parts = window.location.pathname.split("/").filter(Boolean);
    setId(parts[parts.length - 1] || null);
  }, []);

  useEffect(() => {
    let cancelled = false;
    import("react-pdf")
      .then((mod) => {
        if (cancelled) return;
        mod.pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${mod.pdfjs.version}/pdf.worker.min.js`;
        setPdfApi(mod);
      })
      .catch((err) => {
        console.error("react-pdf import error:", err);
        if (!cancelled) setLoadError(err?.message || "module");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setContainerWidth(el.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [pdfApi]);

  const isLoadingApp = !id || !pdfApi;

  return (
    <>
      <Head>
        <title>Xem tài nguyên</title>
      </Head>
      <div className="min-h-screen bg-gray-100">
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-4xl items-center gap-2 px-3 py-3 sm:px-4">
            <Link
              href="/tai-nguyen"
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-primary"
            >
              <ArrowLeft size={16} />
              Quay lại
            </Link>
          </div>
        </div>

        <div ref={containerRef} className="mx-auto w-full max-w-4xl px-3 py-4 sm:px-4">
          {loadError ? (
            <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              Không thể tải file PDF. Vui lòng thử lại.
            </p>
          ) : isLoadingApp ? (
            <div className="flex items-center justify-center gap-2 py-16 text-gray-400">
              <Loader2 size={22} className="animate-spin" />
              <span className="text-sm">Đang tải...</span>
            </div>
          ) : (
            <pdfApi.Document
              file={getResourceViewUrl(id)}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              onLoadError={(err) => {
                console.error("PDF load error:", err);
                setLoadError(err?.message || "pdf");
              }}
              loading={
                <div className="flex items-center justify-center gap-2 py-16 text-gray-400">
                  <Loader2 size={22} className="animate-spin" />
                  <span className="text-sm">Đang tải PDF...</span>
                </div>
              }
            >
              {containerWidth > 0 &&
                Array.from({ length: numPages }, (_, i) => (
                  <div key={i} className="mb-3 overflow-hidden rounded-lg shadow-sm">
                    <pdfApi.Page
                      pageNumber={i + 1}
                      width={containerWidth}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  </div>
                ))}
            </pdfApi.Document>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewResourcePage;
