import * as React from "react";
import { Row, Container, Button, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import VideoModal from "./VideoModal";
import NewsCarousel from "../../modules/news/NewsCarousel";
import UpcommingEventCards from "../../modules/events/components/UpcommingEventCards";
import PastEventCards from "../../modules/events/components/PastEventCards";
import Animate from "../../shared/components/Animate";
import { AnimatedArrow } from "../../shared/components/AnimatedArrow";
import RegisterForm from "../../modules/auth/forms/register/RegisterForm";

const HomePage = () => {
  const navigate = useNavigate();
  const heroImageUrl = `${process.env.REACT_APP_IMAGES_ENDPOINT}canada-3290310_1280.jpg`;
  return (
    <>
      <div
        id="hero"
        style={{
          display: "flex",
          flexWrap: "wrap",
          background: `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.4)), url(${heroImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "calc( 100vh - 86px)",
          width: "100%",
          position: "relative",
        }}
      >
        <div className="overlay"></div>
        <div className="content">
          <Container>
            <Row className="align-items-center">
              <Col
                xs={12}
                md={12}
                lg={6}
                xl={6}
                xxl={6}
                className="text-center text-lg-start pt-5 pb-5"
              >
                <Animate>
                  <h1 className="mb-4">Rising the Family</h1>
                </Animate>
                <div>
                  <Animate delay={0.3}>
                    <p className="mb-4">
                      We are dedicated to building Carelick into a respectable
                      and reliable social institution geared towards{" "}
                      <b>caring for the needy</b>
                    </p>
                  </Animate>
                  <Animate delay={0.7}>
                    <div>
                      <VideoModal />
                    </div>
                  </Animate>
                </div>
              </Col>
              <Col className="p-5" xs={12} md={12} lg={6} xl={6} xxl={6}>
                <h2 className="text-center">Register</h2>
                <Card>
                  <Card.Body className="p-4">
                    <RegisterForm />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
          <AnimatedArrow id={"our_goal"} />
        </div>
      </div>
      <div id="our_goal" className="pt-5">
        <Container>
          <Row>
            <Col>
              <h2 className="mb-4">Our Goal</h2>
              <p>
                Our goal is to make a statement that we should not forget those
                who need our support and know fully well that slogans are not
                the substitute of the performance.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="pt-4 pb-5">
        <Container>
          <Row>
            <Col>
              <h2 className="mb-4">News</h2>
              <NewsCarousel />
            </Col>
          </Row>
        </Container>
      </div>
      <div className="pt-5">
        <Container>
          <Row>
            <Col xs={8}>
              <h2 className="mb-4 float-start">Upcomming Events</h2>
            </Col>
          </Row>
        </Container>
        <UpcommingEventCards />
      </div>
      <div className="pt-5">
        <Container>
          <Row>
            <Col xs={8}>
              <h2 className="mb-4 float-start">Past Events</h2>
            </Col>
            <Col xs={4}>
              <Button
                variant="outline-primary"
                className="mb-4 float-end"
                onClick={() => navigate("/events")}
              >
                More Events
              </Button>
            </Col>
          </Row>
        </Container>
        <PastEventCards />
      </div>
    </>
  );
};

export default HomePage;
