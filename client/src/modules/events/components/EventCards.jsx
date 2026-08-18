import * as React from "react";
import useImageScrollOnHover from "../hooks/useImageScrollOnHover";
import { useNavigate } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { Card, Row, Col, Container } from "react-bootstrap";
import UnixTimeDisplay from "../../../shared/components/UnixTimeDisplay";

const EventCard = ({ event }) => {
  const { wrapperRef, imgRef, setHovered, transformStyle } =
    useImageScrollOnHover();
  const navigate = useNavigate();

  return (
    <Card
      className="h-100 hover-shadow card-hover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate("/events/" + event.event_id)}
    >
      <div className="card-image-wrapper" ref={wrapperRef}>
        <Card.Img
          variant="top"
          src={`${process.env.REACT_APP_IMAGES_ENDPOINT}${event.event_image}`}
          className="card-img-top"
          ref={imgRef}
          style={{ transform: transformStyle }}
        />
      </div>
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
      </Card.Body>
      <Card.Footer className={"text-muted"}>
        <SlCalender />
        <small className="ms-3">
          <UnixTimeDisplay unix={event.creation_time} />
        </small>
      </Card.Footer>
    </Card>
  );
};

const EventCards = ({ events }) => {
  return (
    <Container>
      <Row xs={1} md={1} lg={3} className="g-4">
        {events?.length > 0
          ? events?.map((event) => (
              <Col key={event.event_id}>
                <EventCard event={event} />
              </Col>
            ))
          : null}
        {events?.length == 0 ? <Col>No Events to Display</Col> : null}
      </Row>
    </Container>
  );
};

export default EventCards;
