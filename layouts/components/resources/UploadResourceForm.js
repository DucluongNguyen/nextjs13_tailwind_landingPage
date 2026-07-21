import { Commons } from "@layouts/components/commons";
import { Form, Formik } from "formik";
import { UploadCloud } from "lucide-react";
import { useRef } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useUploadResource } from "hooks/useResources";

const schema = Yup.object({
  title: Yup.string().trim().required("Vui lòng nhập tên tài nguyên"),
});

// Chỉ nhận PDF — để tài nguyên nào cũng xem trực tiếp được trên trình duyệt
// bằng trình xem PDF gốc, không cần tải phần mềm khác.
const ACCEPTED_EXT = ".pdf";
const ACCEPTED_MIME = "application/pdf";

// Form upload tài nguyên — chỉ hiển thị/khả dụng khi đã chọn 1 danh mục đích
// (admin chọn node trên cây trước, rồi mới upload file vào node đó).
const UploadResourceForm = ({ category }) => {
  const { mutateAsync: upload, isPending } = useUploadResource();
  const fileInputRef = useRef(null);

  if (!category) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 p-6 text-center text-sm text-gray-400">
        Chọn 1 danh mục ở cây bên trái để upload tài nguyên vào đó.
      </div>
    );
  }

  const onSubmit = async (values, { resetForm }) => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    if (file.type !== ACCEPTED_MIME) {
      toast.error("Chỉ chấp nhận file PDF");
      return;
    }

    await upload({
      title: values.title,
      description: values.description,
      category: category.id,
      file,
    });

    resetForm();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <p className="mb-3 text-sm text-gray-500">
        Upload vào danh mục: <span className="font-semibold text-dark">{category.name}</span>
      </p>

      <Formik
        initialValues={{ title: "", description: "" }}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <Form>
            <Commons.Input
              name="title"
              label="Tên tài nguyên"
              placeholder="VD: Đề thi giữa kỳ 1 - Lớp 10"
            />
            <Commons.Input
              name="description"
              label="Mô tả (tuỳ chọn)"
              placeholder="VD: Kèm đáp án chi tiết"
            />

            <div className="mb-4 flex flex-col">
              <label className="mb-1 text-sm font-bold text-gray-700">
                File tài nguyên
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_EXT}
                required
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
              <span className="mt-1 text-xs text-gray-400">
                Chỉ nhận file PDF — tối đa 50MB
              </span>
            </div>

            <Commons.Button
              className="btn btn-primary flex w-full items-center justify-center gap-2"
              onClick={handleSubmit}
              loading={isPending}
              disabled={isPending}
            >
              <UploadCloud size={18} />
              Tải lên
            </Commons.Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UploadResourceForm;
