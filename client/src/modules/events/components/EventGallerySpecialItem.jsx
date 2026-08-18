import * as React from "react";
import { Card, Image } from "react-bootstrap";

const EventGallerySpecialItem = ({ src, count, onClick }) => {
  return (
    <Card className="image-card position-relative">
      <Image thumbnail src={src} className="thumbnail-img overlay-count" />
      <div
        className="overlay-count d-flex justify-content-center align-items-center"
        onClick={onClick}
      >
        <span>{`+${count}`}</span>
      </div>
    </Card>
  );
};

export default EventGallerySpecialItem;
