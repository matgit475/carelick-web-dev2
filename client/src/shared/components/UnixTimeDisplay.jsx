import React from "react";

const UnixTimeDisplay = ({
  unix,
  isMilliseconds = false,
  locale = "en-US",
  options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  },
}) => {
  const timestamp = isMilliseconds ? unix : unix * 1000;
  const date = new Date(timestamp);
  const formatted = date.toLocaleString(locale, options);

  return <span>{formatted}</span>;
};

export default UnixTimeDisplay;
