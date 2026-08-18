import * as React from "react";

const useLightbox = () => {
  const [lightboxController, setLightboxController] = React.useState({
    toggler: false,
    slide: 1,
  });

  const openLightboxOnSlide = (index) => {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: index + 1,
    });
  };

  return {
    lightboxController,
    openLightboxOnSlide,
  };
};

export default useLightbox;
