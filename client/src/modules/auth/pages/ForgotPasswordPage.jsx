import * as React from "react";
import ForgotPasswordForm from "../../../modules/auth/forms/ForgotPasswordForm";
import AuthPageContainer from "../components/AuthPageContainer";

const ForgotPasswordPage = () => {
  return (
    <AuthPageContainer>
      <h3 className="text-center mb-4">Forgot Password</h3>
      <p className="text-center">
        A new password will be sent to your registered email
      </p>
      <ForgotPasswordForm />
    </AuthPageContainer>
  );
};

export default ForgotPasswordPage;
