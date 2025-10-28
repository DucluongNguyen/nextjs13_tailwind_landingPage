import { Form, Formik } from "formik";
import React from "react";
import { Commons } from "./commons";
import { useRegister } from "@hooks/useRegister";
import { toast } from "react-toastify";

import * as Yup from "yup";

const nameRegex = /^[\p{L}\s.'-]{2,100}$/u;
const phoneRegex = /^(?:\+84|0)\d{9}$/;

const schema = Yup.object({
  username: Yup.string()
    .trim()
    .required("Vui lòng nhập họ và tên")
    .matches(nameRegex, "Tên không hợp lệ")
    .min(2)
    .max(100),
  phone: Yup.string()
    .trim()
    .required("Vui lòng nhập số điện thoại")
    .matches(phoneRegex, "Số điện thoại không hợp lệ"),
});

function RegisterForm({ toggle }) {
  // !State
  const { mutateAsync: register, isPending } = useRegister();

  const onRegister = async (values) => {
    await register(values, {
      onSuccess: () => {
        toggle();
      },
    });
  };

  // !Render
  return (
    <Formik
      initialValues={{
        username: "",
        phone: undefined,
      }}
      onSubmit={onRegister}
      validationSchema={schema}
    >
      {({ handleSubmit }) => (
        <Form>
          <Commons.Input
            name="username"
            label="Họ và tên"
            placeholder="Nhập họ và tên"
          />
          <Commons.Input
            name="phone"
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
          />
          <Commons.Button
            className="btn btn-primary w-full"
            onClick={() => {
              handleSubmit();
            }}
            loading={isPending}
            disabled={isPending}
          >
            Đăng ký tư vấn
          </Commons.Button>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
