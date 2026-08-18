import * as React from "react";
import LoginForm from "../../../modules/auth/forms/LoginForm";
import AuthPageContainer from "../components/AuthPageContainer";

const RegisterPage = () => {
  return (
    <AuthPageContainer>
      <h3 className="text-center mb-4">Welcome</h3>
      <p className="text-center">Let's go to platform</p>
      <LoginForm size={"sm"} />
    </AuthPageContainer>
  );
};

export default RegisterPage;
