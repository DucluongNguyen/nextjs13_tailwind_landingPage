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
            // navpanes=0: ẩn sẵn khung thumbnail/mục lục bên trái khi mở PDF
            // (người dùng vẫn có thể tự bật lại qua nút menu ở toolbar)
            src={`${fileUrl}#toolbar=1&navpanes=0`}
            title={title}
            className="h-full w-full rounded-lg border-0"
          />
        )}
      </div>
    </Commons.Modal>
  );
};

export default PdfViewerModal;
