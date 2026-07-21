import { Commons } from "@layouts/components/commons";
import Base from "@layouts/Baseof";
import { getErrorMsg } from "helpers";
import { useAuth } from "context/AuthContext";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const schema = Yup.object({
  name: Yup.string().trim().required("Vui lòng nhập họ và tên"),
  email: Yup.string()
    .trim()
    .required("Vui lòng nhập email")
    .email("Email không hợp lệ"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu cần ít nhất 6 ký tự"),
});

const RegisterPage = () => {
  const router = useRouter();
  const { register } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      await register(values);
      toast.success("Tạo tài khoản thành công");
      router.push("/tai-nguyen");
    } catch (error) {
      toast.error(getErrorMsg(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Base title="Đăng ký tài khoản">
      <section className="section pt-32">
        <div className="container">
          <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h1 className="mb-6 text-center text-2xl font-bold">
              Đăng ký tài khoản
            </h1>

            <Formik
              initialValues={{ name: "", email: "", password: "" }}
              validationSchema={schema}
              onSubmit={onSubmit}
            >
              {({ handleSubmit }) => (
                <Form>
                  <Commons.Input
                    name="name"
                    label="Họ và tên"
                    placeholder="Nhập họ và tên"
                  />
                  <Commons.Input
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                  />
                  <Commons.Input
                    name="password"
                    label="Mật khẩu"
                    type="password"
                    placeholder="Ít nhất 6 ký tự"
                  />
                  <Commons.Button
                    className="btn btn-primary mt-2 w-full"
                    onClick={handleSubmit}
                    loading={submitting}
                    disabled={submitting}
                  >
                    Đăng ký
                  </Commons.Button>
                </Form>
              )}
            </Formik>

            <p className="mt-4 text-center text-sm text-gray-600">
              Đã có tài khoản?{" "}
              <Link href="/login" className="font-semibold text-primary">
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default RegisterPage;
