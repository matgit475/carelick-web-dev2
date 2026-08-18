import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!show) return null;

  return (
    <Button
      onClick={scrollToTop}
      variant="primary"
      className="position-fixed"
      style={{
        bottom: "30px",
        right: "30px",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        zIndex: 1000,
      }}
    >
      <FaArrowUp />
    </Button>
  );
}
