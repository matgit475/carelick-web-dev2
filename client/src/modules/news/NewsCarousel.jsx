import * as React from "react";
import { useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { Card } from "react-bootstrap";
import UnixTimeDisplay from "../../shared/components/UnixTimeDisplay";
import useFetch from "../../shared/hooks/useFetch";
import { getNews } from "./newsApi";

const NewsCarousel = () => {
  const navigate = useNavigate();
  const { data } = useFetch(getNews);
  return (
    <Card className={"pt-4 pb-4"}>
      <Marquee speed={175} gradient={true} pauseOnHover>
        {data?.map((item, idx) => (
          <div
            className="marquee-text d-flex align-items-center "
            onClick={() => navigate("/news")}
          >
            <h4 className="mb-1" style={{ paddingLeft: "70vw" }}>
              📢 {item.title}
            </h4>
            <p className="mb-1 ps-5" style={{ color: "var(--bs-muted-color)" }}>
              {item.headline}
            </p>
            <p className="mb-1 ps-5" style={{ color: "var(--bs-muted-color)" }}>
              <UnixTimeDisplay unix={item.creation_time} />
            </p>
          </div>
        ))}
      </Marquee>
    </Card>
  );
};

export default NewsCarousel;
