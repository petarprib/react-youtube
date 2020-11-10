import React from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import Moment from "react-moment";

const LikedVideosItem = (props) => {
  const { push } = useHistory();
  let { video } = props;

  return (
    <Row
      className="pointer mb-3 mx-sm-0"
      onClick={() => push(`/video/${video.id}`)}
    >
      <Col xs={12} sm={6} md={5} lg={4} xl={3} className="px-0 pr-sm-3">
        <Image className="w-100" src={video.thumbnailMedium} />
      </Col>
      <Col xs={12} sm={6} md={7} lg={8} xl={9} className="px-0">
        <p className="videos-title px-1 p-sm-0">{video.title}</p>
        <p className="videos-details d-inline mb-0 pr-1">
          {parseInt(video.viewCount).toLocaleString()} views
        </p>
        <p className="videos-details d-inline mb-0">•</p>
        <Moment fromNow className="videos-details d-inline pl-1">
          {video.publishedAt}
        </Moment>
      </Col>
    </Row>
  );
};

export default LikedVideosItem;
