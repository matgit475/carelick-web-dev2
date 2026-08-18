import React from "react";
import { FaChevronDown } from "react-icons/fa";
export function AnimatedArrow({ id }) {
  const scrollToNext = () => {
    const nextSection = document.getElementById(id);

    const offset = 85; // height of your navbar
    const elementPosition = nextSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <div
      onClick={scrollToNext}
      className="d-none d-lg-block"
      style={{
        alignContent: "center",
        paddingTop: "50px",
        position: "absolute",
        bottom: "20px",
        transform: "translateX(-50%)",
        cursor: "pointer",
        animation: "bounce 2s infinite",
      }}
    >
      <FaChevronDown size={35} />
    </div>
  );
}
