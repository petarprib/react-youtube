import React from "react";
import RelatedVideoItem from "./RelatedVideoItem";

const RelatedVideoList = (props) => {
  const relatedVideos = props.relatedVideos.map((video, i) => (
    <RelatedVideoItem key={i} video={video} />
  ));

  return (
    <div>
      <h6>Related videos</h6>
      <hr className="mt-3 mb-3" />
      <div className="video-list">{relatedVideos}</div>
    </div>
  );
};

export default RelatedVideoList;
