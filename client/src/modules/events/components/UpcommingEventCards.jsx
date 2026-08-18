import React from "react";
import useFetch from "../../../shared/hooks/useFetch";
import { getUpcommingEvents } from "../eventApi";
import EventCards from "./EventCards";

const UpcommingEventCards = () => {
  const { data } = useFetch(getUpcommingEvents);
  return <EventCards events={data} />;
};

export default UpcommingEventCards;
