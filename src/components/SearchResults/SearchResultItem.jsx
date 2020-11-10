import React from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import Moment from "react-moment";

const SearchResultItem = (props) => {
  const { push } = useHistory();
  const { video } = props;

  return (
    <Row
      className="pointer mb-3 mx-sm-0"
      onClick={() => push(`/video/${video.id}`)}
    >
      <Col xs={12} sm={6} md={5} lg={4} xl={3} className="px-0 pr-sm-3">
        <Image
          src={video.thumbnailMedium}
          alt={`${video.title}`}
          className="w-100"
        />
      </Col>
      <Col xs={12} sm={6} md={7} lg={8} xl={9} className="px-1 px-sm-0">
        <p className="videos-title mb-0">{video.title}</p>
        <p className="videos-details d-inline mb-0 pr-1">
          {parseInt(video.viewCount).toLocaleString()} views
        </p>
        <p className="videos-details d-inline mb-0">•</p>
        <Moment fromNow className="videos-details d-inline pl-1">
          {video.publishedAt}
        </Moment>
        <div>
          <p className="videos-details d-none d-md-block">
            {video.description.slice(0, 120)}
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default SearchResultItem;
