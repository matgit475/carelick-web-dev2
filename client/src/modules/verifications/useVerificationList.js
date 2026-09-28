import { useState, useEffect } from "react";
import { getRequests, declineRequest, acceptRequest } from "./verificationApi";

export default function useVerificationList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" }); // Scrolls to top
  };

  const loadRequests = () => {
    getRequests()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(scrollToTop);
  };

  const removeUser = (user) => {
    setUsers((currentUsers) =>
      currentUsers.filter((currentUser) => currentUser.id !== user.id),
    );
  };

  const onRequest = (user, request) => {
    setError(null);
    setSuccess(null);
    request(user.id)
      .then((response) => {
        removeUser(user);
        setSuccess(response.data.message);
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(scrollToTop);
  };

  const onAccept = (user) => onRequest(user, acceptRequest);
  const onDecline = (user) => onRequest(user, declineRequest);

  return {
    users,
    loadRequests,
    onAccept,
    onDecline,
    error,
    success,
  };
}
