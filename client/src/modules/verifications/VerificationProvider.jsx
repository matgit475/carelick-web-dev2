import * as React from "react";
import useVerificationList from "./useVerificationList";

const VerificationContext = React.createContext(null);

export const VerificationProvider = ({ children }) => {
  const props = useVerificationList();

  return (
    <VerificationContext.Provider value={{ ...props }}>
      {children}
    </VerificationContext.Provider>
  );
};

export const useVerification = () => {
  const context = React.useContext(VerificationContext);
  return context;
};
