import * as React from "react";
import { Modal, Button } from "react-bootstrap";

const VideoModal = () => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" size="lg" className="me-3" onClick={handleShow}>
        Watch Video
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        animation={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>CARELICK 2014</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <iframe
            width="100%"
            height="480"
            src="https://www.youtube.com/embed/pf7KAln_vMQ/?autoplay=1"
            title="CARELICK 2014"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VideoModal;
