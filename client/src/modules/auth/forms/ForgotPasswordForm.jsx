import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Form as BootstrapForm, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import DangerAlert from "../../../shared/components/alerts/DangerAlert";
import SuccessAlert from "../../../shared/components/alerts/SuccessAlert";
import { useAuth } from "../AuthProvider";

// Validation schema
const validationSchema = Yup.object({
    email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email is required"),
});

export default function ForgotPassword() {
    const { handleForgotPassword, error, success, clearMessages } = useAuth();

    React.useEffect(() => {
        clearMessages();
    }, []);

    return (
        <Formik
            initialValues={{
                email: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleForgotPassword}
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
                    <DangerAlert message={error} />
                    <SuccessAlert message={success} />
                    <BootstrapForm.Group controlId="formEmail" className="mb-3">
                        <BootstrapForm.Label>Email address</BootstrapForm.Label>

                        <BootstrapForm.Control
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoFocus
                            autoComplete="email"
                            isInvalid={touched.email && !!errors.email}
                        />

                        <BootstrapForm.Control.Feedback type="invalid">
                            {errors.email}
                        </BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>

                    <div className="d-flex gap-3 pt-4">
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isSubmitting}
                            className="w-50"
                        >
                            {isSubmitting ? "Sending..." : "Send Reset Link"}
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
