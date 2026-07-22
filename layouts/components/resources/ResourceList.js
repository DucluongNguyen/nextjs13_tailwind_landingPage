import { Download, Eye, FileText, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { downloadResource } from "hooks/useResources";

const ResourceRow = ({ resource, editable, onDelete }) => {
  const [downloading, setDownloading] = useState(false);
  // Xem trực tiếp được: PDF (pdf.js) và .docx (mammoth). .doc cũ (nhị phân)
  // không có cách xem tin cậy trên web nên chỉ cho tải về.
  const VIEWABLE_MIMETYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const isViewable = VIEWABLE_MIMETYPES.includes(resource.mimeType);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadResource(resource.id, resource.fileName);
    } finally {
      setDownloading(false);
    }
  };

  return (
    // flex-col trên mobile để title có đủ chỗ xuống dòng thay vì bị ép hẹp
    // giữa icon và các nút hành động — từ sm trở lên mới xếp ngang 1 hàng.
    <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <FileText size={20} />
        </div>

        <div className="min-w-0 flex-1">
          {/* Không truncate — hiện đầy đủ title, tự xuống dòng nếu dài */}
          <p className="break-words font-semibold text-dark">
            {resource.title}
          </p>
          {resource.description && (
            <p className="break-words text-sm text-gray-500">
              {resource.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:ml-auto sm:shrink-0">
        {isViewable && (
          // Mở trang xem tự dựng ở tab mới: PDF -> pdf.js, .docx -> mammoth.
          // Không dùng trình xem gốc của trình duyệt vì không kiểm soát được
          // toolbar/sidebar/fit chiều rộng nhất quán giữa các trình duyệt mobile.
          <a
            href={`/tai-nguyen/xem/${resource.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white"
          >
            <Eye size={16} />
            Xem
          </a>
        )}

        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="btn btn-primary flex items-center gap-1.5 !px-4 !py-2 text-sm disabled:opacity-70"
        >
          {downloading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Download size={16} />
          )}
          Tải về
        </button>

        {editable && (
          <button
            type="button"
            title="Xoá tài nguyên"
            onClick={() => onDelete?.(resource)}
            className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:border-red-300 hover:text-red-500"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

const ResourceList = ({ resources = [], editable = false, onDelete }) => {
  if (resources.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-400">
        Đánh thức đam mê - Chắp cánh ước mơ.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {resources.map((resource) => (
        <ResourceRow
          key={resource.id}
          resource={resource}
          editable={editable}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ResourceList;
