import React from "react";
import { Formik, Form } from "formik";
import { useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import { Form as BootstrapForm, Button } from "react-bootstrap";
import DangerAlert from "../../../shared/components/alerts/DangerAlert";
import { useAuth } from "../AuthProvider";

// Validation schema
const validationSchema = Yup.object({
    email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email is required"),

    otp: Yup.string()
        .required("OTP is required")
        .matches(/^\d{6}$/, "OTP must be 6 digits"),
});

export default function VerifyOtpForm() {
    const [searchParams] = useSearchParams();
    const { handleVerifyOtp, clearMessages, error } = useAuth();
    const email = searchParams.get("email") || "";

    React.useEffect(() => {
        clearMessages();
    }, []);

    return (
        <Formik
            initialValues={{
                email: email,
                otp: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleVerifyOtp}
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
                    {/* Email */}
                    <BootstrapForm.Group controlId="formEmail" className="mb-3">
                        <BootstrapForm.Label>User email</BootstrapForm.Label>

                        <BootstrapForm.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={values.email}
                            disabled
                        />
                    </BootstrapForm.Group>

                    {/* OTP */}
                    <BootstrapForm.Group controlId="formOtp" className="mb-3">
                        <BootstrapForm.Label>OTP</BootstrapForm.Label>

                        <BootstrapForm.Control
                            type="text"
                            name="otp"
                            placeholder="Enter OTP"
                            value={values.otp}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoFocus
                            inputMode="numeric"
                            maxLength={6}
                            isInvalid={touched.otp && !!errors.otp}
                        />

                        <BootstrapForm.Control.Feedback type="invalid">
                            {errors.otp}
                        </BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>

                    {/* Submit */}
                    <div className="d-flex gap-3 pt-4">
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isSubmitting}
                            className="w-100"
                        >
                            {isSubmitting ? "Verifying..." : "Verify OTP"}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
