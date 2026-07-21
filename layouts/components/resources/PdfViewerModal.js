import { Commons } from "@layouts/components/commons";
import { Loader2 } from "lucide-react";

// Modal xem PDF trực tiếp trong trang — dùng trình xem PDF gốc của trình
// duyệt (qua <iframe src={blob url}>). `fileUrl` là object URL lấy từ
// getResourceViewUrl() trong hooks/useResources.js.
const PdfViewerModal = ({ open, title, fileUrl, loading, onClose }) => {
  return (
    <Commons.Modal open={open} onClose={onClose} title={title} width="max-w-5xl">
      <div className="flex h-[80vh] items-center justify-center overflow-hidden rounded-lg bg-gray-100">
        {loading || !fileUrl ? (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <Loader2 size={28} className="animate-spin" />
            <span className="text-sm">Đang tải PDF...</span>
          </div>
        ) : (
          <iframe
            // navpanes=0: ẩn khung thumbnail bên trái.
            // view=FitH: fit chiều rộng trang PDF theo khung xem — nếu không có
            // tham số này, trình xem PDF mặc định zoom 100% theo kích thước thật
            // của trang (vd khổ A4 ~ 816px), rộng hơn khung trên mobile nên bị
            // cắt/khuất nội dung 2 bên thay vì tự co lại vừa màn hình.
            src={`${fileUrl}#toolbar=1&navpanes=0&view=FitH`}
            title={title}
            className="h-full w-full rounded-lg border-0"
          />
        )}
      </div>
    </Commons.Modal>
  );
};

export default PdfViewerModal;
