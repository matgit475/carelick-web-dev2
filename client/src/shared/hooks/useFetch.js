import React, { useEffect } from "react";

export default function useFetch(fetchData, dependencies = []) {
  const [data, setData] = React.useState(null);
  useEffect(() => {
    fetchData()
      .then((response) => {
        setData(response.data);
      })
      .catch((e) => {
        setData(null);
      });
  }, dependencies);
  return {
    data,
    setData,
  };
}
