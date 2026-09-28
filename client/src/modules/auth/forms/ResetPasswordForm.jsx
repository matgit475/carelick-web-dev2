import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Form as BootstrapForm, Button } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import DangerAlert from "../../../shared/components/alerts/DangerAlert";
import { useAuth } from "../AuthProvider";

// Validation schema
const validationSchema = Yup.object({
  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),

  retypePassword: Yup.string()
    .required("Please retype your password")
    .oneOf([Yup.ref("newPassword")], "Passwords do not match"),
});

export default function ResetPassword() {
  const { handleResetPassword, error } = useAuth();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  return (
    <Formik
      initialValues={{
        token: token,
        newPassword: "",
        retypePassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleResetPassword}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
      }) => (
        <Form noValidate>
          {/* Hidden reset token */}
          <input type="hidden" name="token" value={values.token} />
          <DangerAlert message={error} />
          {/* New Password */}
          <BootstrapForm.Group controlId="formNewPassword" className="mb-3">
            <BootstrapForm.Label>New Password</BootstrapForm.Label>

            <BootstrapForm.Control
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="new-password"
              isInvalid={touched.newPassword && !!errors.newPassword}
              autoFocus
            />

            <BootstrapForm.Control.Feedback type="invalid">
              {errors.newPassword}
            </BootstrapForm.Control.Feedback>
          </BootstrapForm.Group>

          {/* Retype Password */}
          <BootstrapForm.Group controlId="formRetypePassword" className="mb-3">
            <BootstrapForm.Label>Retype Password</BootstrapForm.Label>

            <BootstrapForm.Control
              type="password"
              name="retypePassword"
              placeholder="Retype password"
              value={values.retypePassword}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="new-password"
              isInvalid={touched.retypePassword && !!errors.retypePassword}
            />

            <BootstrapForm.Control.Feedback type="invalid">
              {errors.retypePassword}
            </BootstrapForm.Control.Feedback>
          </BootstrapForm.Group>

          {/* Buttons */}
          <div className="d-flex gap-3 pt-4">
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              className="w-50"
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </Button>

            <Link to="/auth/login" className="w-50">
              <Button variant="light" type="button" className="w-100">
                Cancel
              </Button>
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}
