import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { useVerification } from "./VerificationProvider";

const TopVerification = () => {
  const { users, loadRequests } = useVerification();

  React.useEffect(() => {
    loadRequests();
  }, []);

  return (
    <a
      href="/portal/admin/verifications"
      className="d-flex align-items-center text-decoration-none text-dark me-3"
    >
      <FiCheckCircle size={20} className="me-1" />
      <span className="d-none d-md-inline">Verification</span>
      <span className="badge bg-primary ms-2">{users?.length}</span>
    </a>
  );
};

export default TopVerification;
