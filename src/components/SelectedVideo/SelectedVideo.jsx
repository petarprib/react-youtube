import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./SelectedVideo.css";
import { Row, Col } from "react-bootstrap";
import Moment from "react-moment";
import RelatedVideoList from "../RelatedVideos/RelatedVideoList.jsx";

const SelectedVideo = (props) => {
  const { videoId } = useParams();
  const { selectedVideo, relatedVideos, likedVideos, dislikedVideos } = props;
  const [showDescr, setShowDescr] = useState(false);

  let likeCount = parseInt(selectedVideo.likeCount);
  let likeColor = "#606060";
  let dislikeCount = parseInt(selectedVideo.dislikeCount);
  let dislikeColor = "#606060";

  for (let i = 0; i < likedVideos.length; i++) {
    if (selectedVideo.id === likedVideos[i].id) {
      likeCount += 1;
      likeColor = "#32CD32";
      break;
    }
  }

  for (let i = 0; i < dislikedVideos.length; i++) {
    if (selectedVideo.id === dislikedVideos[i].id) {
      dislikeCount += 1;
      dislikeColor = "#FF0000";
      break;
    }
  }

  useEffect(() => {
    if (props.DEPLOYMENT === false) props.handleVideoSelect(videoId);
  }, [videoId]);

  return (
    <Row>
      <Col xs={12} lg={9} className="px-0 px-sm-3">
        <div className="embed-responsive embed-responsive-16by9 mb-1">
          <iframe
            title={selectedVideo.title}
            src={`https://www.youtube.com/embed/${selectedVideo.id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <h1 id="selected-video-title" className="mb-0 px-1 px-sm-0">
          {selectedVideo.title}
        </h1>
        <Row className="px-1 px-sm-0">
          <Col xs={6} className="pr-0">
            <p className="selected-video-details d-inline pr-1">
              {parseInt(selectedVideo.viewCount).toLocaleString()} views
            </p>
            <p className="selected-video-details d-inline pr-1">•</p>
            <Moment
              format="MMM DD, YYYY"
              className="selected-video-details d-inline"
            >
              {selectedVideo.publishedAt}
            </Moment>
          </Col>
          <Col xs={6} className="text-right pl-0">
            <i
              className="fas fa-thumbs-up d-inline pr-1"
              style={{ color: likeColor }}
              onClick={() => props.handleLike(selectedVideo)}
            ></i>
            <p className="d-inline selected-video-details pr-3">
              {Math.abs(likeCount) > 999
                ? `${
                    Math.sign(likeCount) *
                    (Math.abs(likeCount) / 1000).toFixed(1)
                  }K`
                : Math.sign(likeCount) * Math.abs(likeCount)}
            </p>
            <i
              className="fas fa-thumbs-down d-inline pr-1"
              style={{ color: dislikeColor }}
              onClick={() => props.handleDislike(selectedVideo)}
            ></i>
            <p className="d-inline selected-video-details">
              {Math.abs(dislikeCount) > 999
                ? `${
                    Math.sign(dislikeCount) *
                    (Math.abs(dislikeCount) / 1000).toFixed(1)
                  }K`
                : Math.sign(dislikeCount) * Math.abs(dislikeCount)}
            </p>
          </Col>
        </Row>
        <hr className="mt-2 mb-0" />

        <p
          className={
            showDescr
              ? "selected-video-details px-1 px-sm-0 mt-1"
              : "selected-video-details px-1 px-sm-0"
          }
        >
          {showDescr ? selectedVideo.description : ""}
        </p>
        <div className="d-flex justify-content-center">
          <p className="pointer mt-3" onClick={() => setShowDescr(!showDescr)}>
            {showDescr ? "Hide description" : "Show description"}
          </p>
        </div>
        <hr className="mt-3" />
      </Col>
      <Col xs={12} lg={3} className="pl-lg-0">
        <RelatedVideoList relatedVideos={relatedVideos} />
      </Col>
    </Row>
  );
};

export default SelectedVideo;
