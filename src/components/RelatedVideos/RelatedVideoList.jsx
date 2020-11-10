import React from "react";
import RelatedVideoItem from "./RelatedVideoItem";

const RelatedVideoList = (props) => {
  const relatedVideos = props.relatedVideos.map((video, i) => (
    <RelatedVideoItem key={i} video={video} />
  ));

  return (
    <>
      <h6>Related videos</h6>
      <div className="mt-3">{relatedVideos}</div>
    </>
  );
};

export default RelatedVideoList;
