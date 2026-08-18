import * as React from "react";
import RegisterForm from "../../../modules/auth/forms/register/RegisterForm";
import AuthPageContainer from "../components/AuthPageContainer";

const RegisterPage = () => {
  return (
    <AuthPageContainer>
      <h3 className="text-center mb-4">Register</h3>
      <p className="text-center">Register the right way</p>
      <RegisterForm />
    </AuthPageContainer>
  );
};

export default RegisterPage;
