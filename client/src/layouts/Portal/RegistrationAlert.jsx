import * as React from "react";
import InformationAlert from "../../shared/components/alerts/InformationAlert";
import { useAuth } from "../../modules/auth/AuthProvider";

const RegistrationAlert = () => {
  const { user } = useAuth();
  return !user?.account_verified ? (
    <InformationAlert
      message={
        "Registration is in progress, once completed you will be notified through email! Some of the features will be unavailable untill approved by Carelick team"
      }
    />
  ) : null;
};

export default RegistrationAlert;
