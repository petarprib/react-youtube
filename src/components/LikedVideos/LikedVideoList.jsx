import React from "react";
import LikedVideoItem from "./LikedVideoItem";

const LikedVideoList = (props) => {
  if (!props.likedVideos.length) {
    return <p>You have not liked any videos</p>;
  } else {
    let likedVideos = props.likedVideos.reverse().map((video, i) => {
      return (
        <LikedVideoItem
          key={i}
          video={video}
          handleVideoSelect={props.handleVideoSelect}
        />
      );
    });

    return (
      <div>
        <h1>Liked videos</h1>
        {likedVideos}
      </div>
    );
  }
};

export default LikedVideoList;
