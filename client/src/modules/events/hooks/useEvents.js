import * as React from "react";
import useFetch from "../../../shared/hooks/useFetch";
import { getEvents } from "../eventApi";

const CARDS_PER_PAGE = 3;

const useEvents = () => {
  const { data: events } = useFetch(getEvents);
  const [filter, setFilter] = React.useState("all");
  const [currentPage, setCurrentPage] = React.useState(1);
  const today = new Date();

  const filteredEvents = events?.filter((event) => {
    const eventDate = event?.creation_time;
    if (filter === "upcoming") return eventDate > today;
    if (filter === "past") return eventDate < today;
    return true;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredEvents?.length / CARDS_PER_PAGE);

  const paginatedEvents = filteredEvents?.slice(
    (currentPage - 1) * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE,
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1); // reset to page 1 when filter changes
  };

  return {
    filter,
    currentPage,
    totalPages,
    paginatedEvents,
    handlePageChange,
    handleFilterChange,
  };
};

export default useEvents;
