import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Row, Col, Form as BootstrapForm, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import RequiredLabel from "../../../../shared/components/forms/RequiredLabel";
import TermsAndConditionsModal from "./TermsAndConditionsModal";
import { useAuth } from "../../AuthProvider";
import DangerAlert from "../../../../shared/components/alerts/DangerAlert";
import SuccessAlert from "../../../../shared/components/alerts/SuccessAlert";

// Yup validation schema
const validationSchema = Yup.object({
  firstName: Yup.string().trim().required("First name is required"),
  lastName: Yup.string().trim().required("Last name is required"),
  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  termsAccepted: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions",
  ),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  termsAccepted: false,
};
export default function RegisterForm({ size = "md" }) {
  const { handleRegister, error, success } = useAuth();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleRegister}
      validateOnBlur={true}
      validateOnChange={true}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        setFieldTouched,
        validateField,
        isSubmitting,
      }) => {
        const handleChecked = (e) => {
          e.preventDefault();
          if (values.termsAccepted) {
            setFieldValue("termsAccepted", false);
            setFieldTouched("termsAccepted", true);
            return;
          }
        };

        const handleAccept = async () => {
          await setFieldValue("termsAccepted", true, true);
          await setFieldTouched("termsAccepted", true, true);
          await validateField("termsAccepted");
        };

        return (
          <Form noValidate>
            <DangerAlert message={error} />
            <SuccessAlert message={success} />
            <Row>
              <Col lg={6}>
                <BootstrapForm.Group controlId="formFirstName" className="p-2">
                  <RequiredLabel>First Name</RequiredLabel>

                  <BootstrapForm.Control
                    type="text"
                    size={size}
                    name="firstName"
                    placeholder="Enter first name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.firstName && Boolean(errors.firstName)}
                    autoFocus
                  />

                  <BootstrapForm.Control.Feedback type="invalid">
                    {touched.firstName && errors.firstName}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>
              </Col>

              <Col lg={6}>
                <BootstrapForm.Group controlId="formLastName" className="p-2">
                  <RequiredLabel>Last Name</RequiredLabel>

                  <BootstrapForm.Control
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    size={size}
                    isInvalid={touched.lastName && Boolean(errors.lastName)}
                  />

                  <BootstrapForm.Control.Feedback type="invalid">
                    {touched.lastName && errors.lastName}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>
              </Col>
            </Row>

            <BootstrapForm.Group controlId="formEmail" className="p-2">
              <RequiredLabel>User Email</RequiredLabel>

              <BootstrapForm.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                size={size}
                isInvalid={touched.email && Boolean(errors.email)}
              />

              <BootstrapForm.Control.Feedback type="invalid">
                {touched.email && errors.email}
              </BootstrapForm.Control.Feedback>
            </BootstrapForm.Group>

            <Row>
              <Col lg={6}>
                <BootstrapForm.Group controlId="formPassword" className="p-2">
                  <RequiredLabel>Password</RequiredLabel>

                  <BootstrapForm.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    size={size}
                    isInvalid={touched.password && Boolean(errors.password)}
                  />

                  <BootstrapForm.Control.Feedback type="invalid">
                    {touched.password && errors.password}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>
              </Col>

              <Col lg={6}>
                <BootstrapForm.Group
                  controlId="formConfirmPassword"
                  className="p-2"
                >
                  <RequiredLabel>Re-type Password</RequiredLabel>

                  <BootstrapForm.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    size={size}
                    isInvalid={
                      touched.confirmPassword && Boolean(errors.confirmPassword)
                    }
                  />

                  <BootstrapForm.Control.Feedback type="invalid">
                    {touched.confirmPassword && errors.confirmPassword}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>
              </Col>
            </Row>

            <BootstrapForm.Group controlId="formBasicCheckbox" className="p-2">
              <BootstrapForm.Check
                id="termsAccepted"
                name="termsAccepted"
                type="checkbox"
                className="mb-3 d-inline"
                checked={values.termsAccepted}
                onMouseDown={handleChecked}
                onBlur={handleBlur}
                onChange={() => {}}
              />

              <label
                className="ps-2"
                htmlFor="termsAccepted"
                onMouseDown={(e) => e.preventDefault()}
              >
                I accept the <TermsAndConditionsModal onAccept={handleAccept} />
              </label>

              {touched.termsAccepted && errors.termsAccepted && (
                <BootstrapForm.Control.Feedback
                  type="invalid"
                  className="d-block"
                >
                  {errors.termsAccepted}
                </BootstrapForm.Control.Feedback>
              )}
            </BootstrapForm.Group>

            <div className="d-flex gap-3 p-2">
              <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting}
                className="w-50"
                size={size}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </Button>

              <Link to="/auth/login" className="w-50">
                <Button variant="light" className="w-100" size={size}>
                  Login
                </Button>
              </Link>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
