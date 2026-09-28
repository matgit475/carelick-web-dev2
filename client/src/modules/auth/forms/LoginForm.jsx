import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Form as BootstrapForm, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import DangerAlert from "../../../shared/components/alerts/DangerAlert";
import { useAuth } from "../AuthProvider";

const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required"),

  password: Yup.string().required("Password is required"),
});

export default function LoginForm() {
  const { handleLogin, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
      }) => {
        return (
          <Form noValidate>
            <DangerAlert message={error} />
            {/* Email */}
            <BootstrapForm.Group className="p-2" controlId="formUsername">
              <BootstrapForm.Label className="fw-bold">
                User email
              </BootstrapForm.Label>

              <BootstrapForm.Control
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Enter email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.email && !!errors.email}
                autoFocus
              />

              <BootstrapForm.Control.Feedback type="invalid">
                {errors.email}
              </BootstrapForm.Control.Feedback>
            </BootstrapForm.Group>

            {/* Password */}
            <BootstrapForm.Group className="p-2" controlId="formPassword">
              <BootstrapForm.Label className="fw-bold">
                Password
              </BootstrapForm.Label>

              <BootstrapForm.Control
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && !!errors.password}
              />

              <BootstrapForm.Control.Feedback type="invalid">
                {errors.password}
              </BootstrapForm.Control.Feedback>
            </BootstrapForm.Group>

            {/* Show password / Forgot password */}
            <div className="d-flex gap-3 p-2 align-items-center">
              <BootstrapForm.Check
                id="show-password-checkbox"
                type="checkbox"
                label={<span style={{ cursor: "pointer" }}>Show password</span>}
                checked={showPassword}
                onChange={togglePasswordVisibility}
                className="w-50"
              />

              <Nav.Link
                as={Link}
                to="/auth/forgot-password"
                className="w-auto forgot-password-link"
              >
                <b>
                  <u>Forgot Password?</u>
                </b>
              </Nav.Link>
            </div>

            {/* Buttons */}
            <div className="d-flex gap-3 p-2">
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting}
                className="w-50"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>

              <Link to="/auth/register" className="w-50">
                <Button variant="light" type="button" className="w-100">
                  Register
                </Button>
              </Link>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
