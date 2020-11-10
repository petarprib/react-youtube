import React from "react";
import { useHistory } from "react-router-dom";
import Moment from "react-moment";
import { Col, Image } from "react-bootstrap";

const RecommVideoItem = (props) => {
  const { push } = useHistory();
  const { video } = props;

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="pb-3 px-0 px-sm-3">
      <Image
        src={video.thumbnailMedium}
        alt={`${video.id}`}
        className="pointer w-100"
        onClick={() => push(`/video/${video.id}`)}
      />
      <div className="pointer" onClick={() => push(`/video/${video.id}`)}>
        <p>{video.title}</p>
        <p className="mr-1 d-inline videos-details">
          {parseInt(video.viewCount).toLocaleString()} views
        </p>
        <p className="mr-1 d-inline videos-details">•</p>
        <Moment fromNow className="d-inline videos-details">
          {video.publishedAt}
        </Moment>
      </div>
    </Col>
  );
};

export default RecommVideoItem;
