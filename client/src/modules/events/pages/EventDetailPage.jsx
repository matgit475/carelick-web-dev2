import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Container, Col, Image, Card, Button } from "react-bootstrap";
import { FiMapPin } from "react-icons/fi";
import { FaImages } from "react-icons/fa";
import Animate from "../../../shared/components/Animate";
import { image_url } from "../../../helpers";
import useFetch from "../../../shared/hooks/useFetch";
import { getEventById } from "../eventApi";
import PastEventCards from "../../events/components/PastEventCards";
import UnixTimeDisplay from "../../../shared/components/UnixTimeDisplay";
import EventGallery from "../components/EventGallery";

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: eventDetail } = useFetch(() => getEventById(id), [id]);
  const url = image_url(eventDetail?.event?.event_image);

  const options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <div className="news-container">
      <Container className="pt-5">
        <Animate>
          <h2 className="mb-4">Event</h2>
        </Animate>
        <Animate delay={0.3}>
          <Card className="p-4 ">
            <Row>
              <Col md={12} lg={4} className="mb-4">
                <Image
                  fluid
                  src={url}
                  alt="Example"
                  className={"w-100"}
                  onClick={() => window.open(url, "_blank")}
                  style={{ cursor: "pointer" }}
                  thumbnail
                />
              </Col>
              <Col md={12} lg={8} className="ps-3">
                <h3 className="mb-2">{eventDetail?.event?.title}</h3>
                <br></br>
                <p className="text-muted">
                  <b>Registration</b>:<br></br>
                  <UnixTimeDisplay
                    unix={eventDetail?.event?.event_reg_from}
                    options={options}
                  />
                  -
                  <UnixTimeDisplay
                    unix={eventDetail?.event?.event_reg_to}
                    options={options}
                  />
                  <br></br>
                  <b>Program Date</b>:<br></br>
                  <UnixTimeDisplay
                    unix={eventDetail?.event?.event_duration_from}
                    options={options}
                  />
                  -
                  <UnixTimeDisplay
                    unix={eventDetail?.event?.event_duration_to}
                    options={options}
                  />
                  <br></br>
                  <FiMapPin /> {eventDetail?.event?.address}
                  <br></br>
                  <b>Notes</b>: <br></br>
                  {eventDetail?.event?.comment}
                </p>
              </Col>
            </Row>
            <Animate>
              <h4 className="mb-4 mt-5">
                <FaImages className="me-3" />
                Photos
              </h4>
            </Animate>
            <Row>
              <EventGallery
                event_images={eventDetail?.event_gallery?.event_images}
              />
            </Row>
            <Animate>
              <Row>
                <Col xs={8}>
                  <h4 className="mb-4 mt-5">Past Events</h4>
                </Col>
                <Col xs={4}>
                  <Button
                    variant="outline-primary"
                    className="mb-4 mt-5 float-end"
                    onClick={() => navigate("/events")}
                  >
                    More Events
                  </Button>
                </Col>
              </Row>
            </Animate>
            <Row>
              <Animate>
                <PastEventCards />
              </Animate>
            </Row>
          </Card>
        </Animate>
      </Container>
    </div>
  );
};

export default EventDetailPage;
