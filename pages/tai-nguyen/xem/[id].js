import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import {
  downloadResource,
  getResourceViewUrl,
  useResourceById,
} from "hooks/useResources";

const PDF_MIME = "application/pdf";
const DOCX_MIME =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const DOC_MIME = "application/msword";

// Nhãn định dạng file hiển thị cho người dùng — ưu tiên đọc từ mimeType, nếu
// gặp mimeType lạ thì fallback lấy đuôi file trong tên gốc.
const getFileTypeLabel = (mimeType, fileName) => {
  if (mimeType === PDF_MIME) return "PDF";
  if (mimeType === DOCX_MIME) return "DOCX";
  if (mimeType === DOC_MIME) return "DOC";
  const ext = fileName?.split(".").pop();
  return ext ? ext.toUpperCase() : "FILE";
};

// Màu nhãn theo định dạng — PDF màu vàng (theo màu icon PDF), Word (.doc/.docx)
// màu xanh dương (theo màu thương hiệu Word).
const getFileTypeBadgeClass = (mimeType) => {
  if (mimeType === PDF_MIME) return "bg-yellow-100 text-yellow-700";
  if (mimeType === DOCX_MIME || mimeType === DOC_MIME)
    return "bg-blue-100 text-blue-700";
  return "bg-primary/10 text-primary";
};

// Trang xem tài nguyên độc lập — PDF tự render bằng pdf.js (qua react-pdf),
// .docx tự render bằng mammoth (chuyển sang HTML ở client) — thay vì dựa vào
// trình xem gốc của trình duyệt hay các dịch vụ nhúng ngoài (Google/Office
// Viewer, vốn yêu cầu file phải truy cập công khai từ internet ngoài, không
// hoạt động khi test ở localhost/mạng nội bộ).
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
// - Tự import("react-pdf")/import("mammoth") bên trong useEffect thay vì
//   dùng next/dynamic — next/dynamic từng không kích hoạt tải chunk được
//   trong dự án này.
// - .doc (định dạng nhị phân cũ, không phải .docx) không có cách xem trực
//   tiếp đáng tin cậy trên web nên chỉ hiện thông báo, không render.
const ViewResourcePage = () => {
  const [id, setId] = useState(null);
  const [pdfApi, setPdfApi] = useState(null); // { Document, Page, pdfjs }
  const [loadError, setLoadError] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [docxHtml, setDocxHtml] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const parts = window.location.pathname.split("/").filter(Boolean);
    setId(parts[parts.length - 1] || null);
  }, []);

  const { data: resource, isLoading: resourceLoading } = useResourceById(id);
  const mimeType = resource?.mimeType;
  const isPdf = mimeType === PDF_MIME;
  const isDocx = mimeType === DOCX_MIME;
  // VD .doc cũ — đã có metadata nhưng không phải định dạng xem được trực tiếp
  const isUnsupported = !!resource && !isPdf && !isDocx;

  // Nạp pdf.js (qua react-pdf) — chỉ khi tài nguyên là PDF
  useEffect(() => {
    if (!isPdf) return;
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
  }, [isPdf]);

  // Nạp mammoth, fetch file .docx rồi chuyển sang HTML — chỉ khi tài nguyên
  // là .docx.
  useEffect(() => {
    if (!isDocx || !id) return;
    let cancelled = false;
    (async () => {
      try {
        const [mammoth, res] = await Promise.all([
          import("mammoth"),
          fetch(getResourceViewUrl(id)),
        ]);
        if (!res.ok) throw new Error("fetch-failed");
        const arrayBuffer = await res.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });
        if (!cancelled) setDocxHtml(result.value);
      } catch (err) {
        console.error("mammoth convert error:", err);
        if (!cancelled) setLoadError(err?.message || "docx");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isDocx, id]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setContainerWidth(el.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [pdfApi]);

  const isLoadingApp =
    !id ||
    resourceLoading ||
    (isPdf && !pdfApi) ||
    (isDocx && !docxHtml && !loadError);

  const handleDownload = async () => {
    if (!id) return;
    setDownloading(true);
    try {
      await downloadResource(id, resource?.fileName);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{resource?.title ? `Xem: ${resource.title}` : "Xem tài nguyên"}</title>
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

            {!isUnsupported && (
              <button
                type="button"
                onClick={handleDownload}
                disabled={downloading}
                className="ml-auto flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-70"
              >
                {downloading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Download size={16} />
                )}
                Tải về
              </button>
            )}

            {/* Nhãn định dạng file (PDF/DOCX/DOC), đặt ngay sau nút Tải về */}
            {resource && (
              <span
                className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-bold ${getFileTypeBadgeClass(
                  resource.mimeType
                )}`}
              >
                {getFileTypeLabel(resource.mimeType, resource.fileName)}
              </span>
            )}
          </div>

          {resource && (
            <div className="mx-auto max-w-4xl px-3 pb-3 text-center sm:px-4">
              <span className="break-words text-lg font-bold text-dark">
                {resource.title}
              </span>
            </div>
          )}
        </div>

        <div
          ref={containerRef}
          className="mx-auto w-full max-w-4xl px-3 py-4 sm:px-4"
        >
          {loadError ? (
            <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              Không thể tải tài nguyên. Vui lòng thử lại.
            </p>
          ) : isUnsupported ? (
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
              Định dạng này chưa hỗ trợ xem trực tiếp, vui lòng tải về để xem.
            </div>
          ) : isLoadingApp ? (
            <div className="flex items-center justify-center gap-2 py-16 text-gray-400">
              <Loader2 size={22} className="animate-spin" />
              <span className="text-sm">Đang tải...</span>
            </div>
          ) : isPdf ? (
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
                  <div
                    key={i}
                    className="mb-3 overflow-hidden rounded-lg shadow-sm"
                  >
                    <pdfApi.Page
                      pageNumber={i + 1}
                      width={containerWidth}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  </div>
                ))}
            </pdfApi.Document>
          ) : (
            // .docx -> mammoth đã chuyển sẵn sang HTML, style bằng
            // @tailwindcss/typography (class "prose") cho dễ đọc.
            <div className="rounded-xl bg-white p-4 shadow-sm sm:p-8">
              <div
                className="prose prose-sm max-w-none break-words sm:prose-base"
                dangerouslySetInnerHTML={{ __html: docxHtml }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewResourcePage;
