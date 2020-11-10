import React from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import Moment from "react-moment";

const RelatedVideoItem = (props) => {
  const { push } = useHistory();
  const { video } = props;

  return (
    <Row
      className="pointer mb-3 mx-sm-0"
      onClick={() => push(`/video/${video.id}`)}
    >
      <Col xs={12} sm={5} md={4} lg={12} className="pl-0 pr-0">
        <Image
          src={video.thumbnailMedium}
          alt={`${video.title}`}
          className="w-100 "
        />
      </Col>
      <Col
        xs={12}
        sm={7}
        md={8}
        lg={12}
        className="px-1 pl-sm-3 pr-sm-0 pl-lg-0 "
      >
        <p className="videos-title mb-0">{video.title}</p>
        <p className="videos-details d-inline mr-1 mb-0">
          {parseInt(video.viewCount).toLocaleString()} views
        </p>
        <p className="videos-details d-inline mr-1 mb-0">•</p>
        <Moment fromNow className="videos-details d-inline">
          {video.publishedAt}
        </Moment>
        {/* <div>
          <p className="videos-descr d-none d-sm-block d-lg-none">
            {video.description.slice(0, 120)}
          </p>
        </div> */}
      </Col>
    </Row>
  );
};

export default RelatedVideoItem;
