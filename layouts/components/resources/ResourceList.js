import { Download, Eye, FileText, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { downloadResource, getResourceViewUrl } from "hooks/useResources";
import { getErrorMsg } from "helpers";
import { toast } from "react-toastify";
import PdfViewerModal from "./PdfViewerModal";

const formatFileSize = (bytes = 0) => {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
};

const ResourceRow = ({ resource, editable, onDelete, onView }) => {
  const [downloading, setDownloading] = useState(false);
  const isPdf = resource.mimeType === "application/pdf";

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadResource(resource.id, resource.fileName);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <FileText size={20} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-dark">{resource.title}</p>
        {resource.description && (
          <p className="truncate text-sm text-gray-500">
            {resource.description}
          </p>
        )}
        <p className="text-xs text-gray-400">
          {resource.fileName} · {formatFileSize(resource.fileSize)}
        </p>
      </div>

      {isPdf && (
        <button
          type="button"
          onClick={() => onView?.(resource)}
          className="flex items-center gap-1.5 rounded-full border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white"
        >
          <Eye size={16} />
          Xem
        </button>
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
  );
};

const ResourceList = ({ resources = [], editable = false, onDelete }) => {
  const [viewing, setViewing] = useState(null); // resource đang xem
  const [viewUrl, setViewUrl] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);

  const handleView = async (resource) => {
    setViewing(resource);
    setViewLoading(true);
    try {
      const url = await getResourceViewUrl(resource.id);
      setViewUrl(url);
    } catch (error) {
      toast.error(getErrorMsg(error));
      setViewing(null);
    } finally {
      setViewLoading(false);
    }
  };

  const closeViewer = () => {
    if (viewUrl) window.URL.revokeObjectURL(viewUrl);
    setViewing(null);
    setViewUrl(null);
  };

  if (resources.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-400">
        Chưa có tài nguyên nào trong danh mục này.
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {resources.map((resource) => (
          <ResourceRow
            key={resource.id}
            resource={resource}
            editable={editable}
            onDelete={onDelete}
            onView={handleView}
          />
        ))}
      </div>

      <PdfViewerModal
        open={!!viewing}
        title={viewing?.title}
        fileUrl={viewUrl}
        loading={viewLoading}
        onClose={closeViewer}
      />
    </>
  );
};

export default ResourceList;
