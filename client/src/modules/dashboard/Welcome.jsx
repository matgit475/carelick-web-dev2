import React from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../auth/AuthProvider";

import { FiCalendar, FiHeart } from "react-icons/fi";

const Welcome = () => {
  const { user } = useAuth();

  return (
    <Card className="border-0 overflow-hidden m-2">
      <Card.Body className="p-4 p-md-5 position-relative">
        <div className="position-relative">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-3">
            {/* Main content */}
            <div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="d-flex align-items-center justify-content-center">
                  <FiHeart size={19} />
                </span>
                <span className="fw-semibold">Carelick Dashboard</span>
              </div>
              <h2 className="fw-bold mb-2">Hi, {user.first_name} 👋</h2>
              <p className="mb-0"> Here's what's happening with Carelick </p>
            </div>
            {/* Date */}
            <div className="d-flex align-items-center gap-2 px-3 py-2">
              <FiCalendar size={16} />
              <span className="fw-medium">
                {new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Welcome;
