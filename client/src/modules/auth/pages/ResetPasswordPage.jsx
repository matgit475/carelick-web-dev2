import * as React from "react";
import ResetPasswordForm from "../../../modules/auth/forms/ResetPasswordForm";
import AuthPageContainer from "../components/AuthPageContainer";

const ResetPasswordPage = () => {
  return (
    <AuthPageContainer>
      <h3 className="text-center mb-4">Reset Password</h3>
      <ResetPasswordForm />
    </AuthPageContainer>
  );
};

export default ResetPasswordPage;
