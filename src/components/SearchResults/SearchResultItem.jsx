import React from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import Moment from "react-moment";

const SearchResultItem = (props) => {
  const { push } = useHistory();
  const { video } = props;

  return (
    <Row
      className="pointer mb-4 video-item"
      onClick={() => push(`/video/${video.id}`)}
    >
      <Col xs={6} sm={5} lg={4} xl={3} className="pl-0">
        <Image
          src={video.thumbnailMedium}
          alt={`${video.id}`}
          className="w-100"
        />
      </Col>
      <Col className="pl-0">
        <p className="videos-title mb-0 text-truncate">{video.title}</p>
        <p className="videos-details d-inline mr-1 mb-0">
          {parseInt(video.viewCount).toLocaleString()} views
        </p>
        <p className="videos-details d-inline mr-1 mb-0">•</p>
        <Moment fromNow className="videos-details d-inline">
          {video.publishedAt}
        </Moment>
        <div>
          <p className="videos-descr">{video.description}</p>
        </div>
      </Col>
    </Row>
  );
};

export default SearchResultItem;
