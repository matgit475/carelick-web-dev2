import * as React from "react";
import { useNavigate } from "react-router-dom";
import { getAccount } from "../../modules/account/accountApi";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyOtp,
} from "./authApi";
const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    loadAccount();
  }, []);

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const loadAccount = () =>
    getAccount()
      .then((response) => {
        setUser(response.data);
      })
      .catch((e) => {
        setUser(null);
      })
      .finally(() => setLoading(false));

  const handleRegister = (values, { setSubmitting }) => {
    setError(null);
    register(values)
      .then((response) => {
        setSuccess(response.data.message);
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => setSubmitting(false));
  };

  const handleLogin = (values, { setSubmitting }) => {
    setError(null);
    login(values)
      .then((response) => {
        const user = response.data;
        setUser(user);
        navigate(`/portal/${user.role}/dashboard`);
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => setSubmitting(false));
  };

  const handleForgotPassword = (values, { setSubmitting }) => {
    setError(null);
    forgotPassword(values)
      .then((response) => {
        setSuccess(response.data.message);
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => setSubmitting(false));
  };

  const handleResetPassword = (values, { setSubmitting }) => {
    resetPassword(values)
      .then((response) => {
        setUser(response.data);
        navigate(`/portal/${response.data.role}/dashboard`);
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleVerifyOtp = (values, { setSubmitting }) => {
    setError(null);
    verifyOtp(values)
      .then((response) => {
        setUser(response.data);
        navigate(`/portal/${response.data.role}/dashboard`);
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    !loading && (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          handleRegister,
          handleLogin,
          handleForgotPassword,
          handleResetPassword,
          handleVerifyOtp,
          clearMessages,
          error,
          success,
        }}
      >
        {children}
      </AuthContext.Provider>
    )
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  return context;
};
