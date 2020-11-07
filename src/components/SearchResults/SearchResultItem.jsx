import React from "react";
import { useHistory } from "react-router-dom";
import "./SearchResults.css";
import { Row, Col, Image } from "react-bootstrap";
import Moment from "react-moment";

const SearchResultItem = (props) => {
  const { push } = useHistory();
  const { video } = props;

  return (
    <Row
      className="pointer mb-3 video-item"
      onClick={() => push(`/video/${video.id}`)}
    >
      <Col
        xs={12}
        sm={6}
        md={5}
        lg={4}
        xl={3}
        id="result-thumbnail"
        className="pl-0"
      >
        <Image
          src={video.thumbnailMedium}
          alt={`${video.title}`}
          className="w-100"
        />
      </Col>
      <Col xs={12} sm={6} md={7} lg={8} xl={9} className="px-0">
        <p id="result-title" className="videos-title mb-0">
          {video.title}
        </p>
        <p className="videos-details d-inline mr-1 mb-0">
          {parseInt(video.viewCount).toLocaleString()} views
        </p>
        <p className="videos-details d-inline mr-1 mb-0">•</p>
        <Moment fromNow className="videos-details d-inline">
          {video.publishedAt}
        </Moment>
        <div className="descr-box">
          <p className="videos-descr d-none d-sm-block">
            {video.description.slice(0, 150)}
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default SearchResultItem;
