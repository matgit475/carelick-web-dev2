import * as React from "react";
import VerifyOtpForm from "../../../modules/auth/forms/VerifyOtpForm";
import AuthPageContainer from "../components/AuthPageContainer";

const VerifyOtpPage = () => {
  return (
    <AuthPageContainer>
      <h3 className="text-center mb-4">Login with OTP</h3>
      <p className="text-center">Login with the OTP send to your email</p>
      <VerifyOtpForm />
    </AuthPageContainer>
  );
};

export default VerifyOtpPage;
