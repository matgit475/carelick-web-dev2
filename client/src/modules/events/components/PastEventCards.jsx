import React from "react";
import useFetch from "../../../shared/hooks/useFetch";
import { getPastEvents } from "../eventApi";
import EventCards from "./EventCards";

const PastEventCards = () => {
  const { data } = useFetch(getPastEvents);
  return <EventCards events={data} />;
};

export default PastEventCards;
