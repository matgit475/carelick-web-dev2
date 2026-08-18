import * as React from "react";

function useImageScrollOnHover() {
  const wrapperRef = React.useRef(null);
  const imgRef = React.useRef(null);
  const [hovered, setHovered] = React.useState(false);
  const [scrollDistance, setScrollDistance] = React.useState(0);

  React.useEffect(() => {
    if (imgRef.current && wrapperRef.current) {
      const updateDistance = () => {
        const imgHeight = imgRef.current.offsetHeight;
        const wrapperHeight = wrapperRef.current.offsetHeight;
        const scroll = imgHeight - wrapperHeight;
        setScrollDistance(scroll > 0 ? scroll : 0);
      };

      updateDistance();

      // Optional: Recalculate on window resize
      window.addEventListener("resize", updateDistance);
      imgRef.current.addEventListener("load", updateDistance);
      return () => {
        window.removeEventListener("resize", updateDistance);
        if (imgRef.current)
          imgRef.current.removeEventListener("load", updateDistance);
      };
    }
  }, []);

  return {
    wrapperRef,
    imgRef,
    setHovered,
    transformStyle: hovered
      ? `translateY(-${scrollDistance}px)`
      : "translateY(0)",
  };
}

export default useImageScrollOnHover;
