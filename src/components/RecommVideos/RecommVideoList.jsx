import React from "react";
import RecommVideoItem from "./RecommVideoItem.jsx";
import { Row } from "react-bootstrap";

const RecommVideoList = (props) => {
  let recommVideos = props.recommVideos;
  for (let i = recommVideos.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [recommVideos[i], recommVideos[j]] = [recommVideos[j], recommVideos[i]];
  }

  recommVideos = props.recommVideos.map((video, i) => (
    <RecommVideoItem key={i} video={video} />
  ));

  let info = !recommVideos.length
    ? "You will have to perform 6 different searches before recommended videos display on your homepage"
    : "";

  return (
    <>
      <h6>Recommended videos</h6>
      <p className="mt-3 text-center">{info}</p>
      <Row className="mt-3">{recommVideos}</Row>
    </>
  );
};

export default RecommVideoList;
