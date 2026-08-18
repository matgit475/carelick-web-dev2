import * as React from "react";
import { getAccount } from "../../modules/account/accountApi";
import useFetch from "../../shared/hooks/useFetch";

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const { data: user, setData: setUser } = useFetch(getAccount);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  return context;
};
