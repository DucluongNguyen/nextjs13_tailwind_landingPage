import { Commons } from "@layouts/components/commons";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
  name: Yup.string().trim().required("Vui lòng nhập tên danh mục"),
});

// Modal dùng chung cho "Thêm danh mục con" và "Đổi tên danh mục".
const CategoryFormModal = ({
  open,
  title = "Danh mục",
  initialName = "",
  submitting = false,
  onClose,
  onSubmit,
}) => {
  return (
    <Commons.Modal open={open} onClose={onClose} title={title}>
      <Formik
        enableReinitialize
        initialValues={{ name: initialName }}
        validationSchema={schema}
        onSubmit={(values) => onSubmit?.(values.name)}
      >
        {({ handleSubmit }) => (
          <Form>
            <Commons.Input
              name="name"
              label="Tên danh mục"
              placeholder="VD: Lớp 10"
              autoFocus
            />
            <div className="mt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Huỷ
              </button>
              <Commons.Button
                className="btn btn-primary !w-auto px-5"
                onClick={handleSubmit}
                loading={submitting}
                disabled={submitting}
              >
                Lưu
              </Commons.Button>
            </div>
          </Form>
        )}
      </Formik>
    </Commons.Modal>
  );
};

export default CategoryFormModal;
