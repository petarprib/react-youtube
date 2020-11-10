import React from "react";
import "./RecommVideos.css";
import Moment from "react-moment";
import { Col, Image } from "react-bootstrap";

const RecommVideoItem = (props) => {
  const { video } = props;

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="pointer mb-3 px-0 px-sm-3">
      <Image
        src={video.thumbnailMedium}
        alt={`${video.id}`}
        className="recomm-thumbnails"
      />
      <p className="px-1 px-sm-0">{video.title}</p>
    </Col>

    // <Col className="mb-3" xs={6} md={4} lg={3}>
    //   <div
    //     className="recommVideos"
    //     onClick={() => props.handleVideoSelect(video)}
    //   >
    //     <img
    //       src={video.thumbnailMedium}
    //       alt={`${video.id}`}
    //       className="recommThumbnails"
    //     />
    //   </div>
    //   <div
    //     className="recommVideos pt-2"
    //     onClick={() => props.handleVideoSelect(video)}
    //   >
    //     <p className="recommVideosTitle mb-0">{video.title}</p>
    //     <p className="recommVideosViews videosDetails mr-1">
    //       {parseInt(video.viewCount).toLocaleString()} views
    //     </p>
    //     <p className="bullet videosDetails mr-1">•</p>
    //     <Moment fromNow className="recommVideosPublished videosDetails">
    //       {video.publishedAt}
    //     </Moment>
    //   </div>
    // </Col>
  );
};

export default RecommVideoItem;
