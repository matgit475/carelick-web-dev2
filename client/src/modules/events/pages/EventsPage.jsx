import * as React from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Row,
  Col,
  Pagination,
} from "react-bootstrap";
import Animate from "../../../shared/components/Animate";
import EventCards from "../components/EventCards";
import useEvents from "../hooks/useEvents";

const EventsPage = () => {
  const {
    filter,
    currentPage,
    paginatedEvents,
    totalPages,
    handlePageChange,
    handleFilterChange,
  } = useEvents();

  return (
    <div className="events-container">
      <Container className="pt-5">
        <Row>
          <Col>
            <Animate>
              <h2 className="mb-4">Event List</h2>
            </Animate>
            <Animate delay={0.3}>
              <ButtonGroup className="mb-4">
                <Button
                  variant={filter === "all" ? "primary" : "outline-primary"}
                  onClick={() => handleFilterChange("all")}
                >
                  All
                </Button>
                <Button
                  variant={
                    filter === "upcoming" ? "primary" : "outline-primary"
                  }
                  onClick={() => handleFilterChange("upcoming")}
                >
                  Upcoming
                </Button>
                <Button
                  variant={filter === "past" ? "primary" : "outline-primary"}
                  onClick={() => handleFilterChange("past")}
                >
                  Past
                </Button>
              </ButtonGroup>
            </Animate>
            <Animate delay={0.3}>
              <EventCards events={paginatedEvents} />
            </Animate>
          </Col>
        </Row>
        <Animate delay={0.3}>
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <Pagination className="justify-content-center mt-4">
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              />
              {Array.from({ length: totalPages }, (_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </Pagination>
          )}
        </Animate>
      </Container>
    </div>
  );
};

export default EventsPage;
