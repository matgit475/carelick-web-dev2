import * as React from "react";
import { Card, Image } from "react-bootstrap";

const EventGalleryItem = ({ src, onClick }) => {
  return (
    <Card className="image-card">
      <Image thumbnail src={src} className="thumbnail-img" onClick={onClick} />
    </Card>
  );
};

export default EventGalleryItem;
