import React from "react";
import { Image } from "react-bootstrap";

const LikedVideosItem = (props) => {
  let { video } = props;

  return (
    <div onClick={() => props.handleVideoSelect(video)}>
      <Image src={video.thumbnailMedium} />
      <p>{video.title}</p>
    </div>
  );
};

export default LikedVideosItem;
