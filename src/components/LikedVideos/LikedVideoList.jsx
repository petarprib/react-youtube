import React from "react";
import LikedVideoItem from "./LikedVideoItem";

const LikedVideoList = (props) => {
  if (!props.likedVideos.length) {
    return <p>You have not liked any videos</p>;
  } else {
    let likedVideos = props.likedVideos.map((video, i) => {
      return (
        <LikedVideoItem
          key={i}
          video={video}
          handleVideoSelect={props.handleVideoSelect}
        />
      );
    });

    return (
      <>
        <h6>Liked videos</h6>
        <div className="mt-3">{likedVideos.reverse()}</div>
      </>
    );
  }
};

export default LikedVideoList;
