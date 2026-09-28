import React from "react";
import * as Yup from "yup";
export function validationSchema(showPasswordFields) {
  return Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    new_password: showPasswordFields
      ? Yup.string()
          .required("New password is required")
          .min(8, "Password must be at least 8 characters")
      : Yup.string().notRequired(),
    retype_password: showPasswordFields
      ? Yup.string()
          .required("Please retype your password")
          .oneOf([Yup.ref("new_password")], "Passwords do not match")
      : Yup.string().notRequired(),
  });
}
