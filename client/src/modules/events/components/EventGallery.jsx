import * as React from "react";
import { Col } from "react-bootstrap";
import FsLightbox from "fslightbox-react";
import useLightBox from "../hooks/useLightbox";
import EventGalleryItem from "./EventGalleryItem";
import EventGallerySpecialItem from "./EventGallerySpecialItem";
import Animate from "../../../shared/components/Animate";
import { get_gallery_image_urls } from "../../../helpers";
const EventGallery = ({ event_images }) => {
  const { lightboxController, openLightboxOnSlide } = useLightBox();

  const galleryImageUrls = get_gallery_image_urls(event_images ?? "");

  return (
    <>
      <FsLightbox
        key={galleryImageUrls.join("|")}
        toggler={lightboxController.toggler}
        sources={galleryImageUrls}
        slide={lightboxController.slide}
      />
      {galleryImageUrls?.length !== 0 ? (
        <>
          {galleryImageUrls.slice(0, 4).map((src, idx) => (
            <Col key={idx} xs={12} md={6} lg={3} className="mb-4">
              <Animate>
                {idx < 3 ? (
                  <EventGalleryItem
                    src={src}
                    onClick={() => openLightboxOnSlide(idx)}
                  />
                ) : galleryImageUrls.length === 4 ? (
                  <EventGalleryItem
                    src={src}
                    onClick={() => openLightboxOnSlide(idx)}
                  />
                ) : (
                  <EventGallerySpecialItem
                    src={src}
                    count={galleryImageUrls.length - 3}
                    onClick={() => openLightboxOnSlide(idx)}
                  />
                )}
              </Animate>
            </Col>
          ))}
        </>
      ) : (
        <Col>No photos to display</Col>
      )}
    </>
  );
};

export default EventGallery;
