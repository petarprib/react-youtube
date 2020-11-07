import React, { useEffect } from "react";
import { useParams } from "react-router";
import "./SelectedVideo.css";
import { Row, Col } from "react-bootstrap";
import Moment from "react-moment";
import RelatedVideoList from "../RelatedVideos/RelatedVideoList.jsx";

const SelectedVideo = (props) => {
  const { videoId } = useParams();
  const { selectedVideo, relatedVideos, likedVideos, dislikedVideos } = props;

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
    <div>
      <div className="embed-responsive embed-responsive-16by9 mb-2">
        <iframe
          title={selectedVideo.title}
          src={`https://www.youtube.com/embed/${selectedVideo.id}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <h1 id="select-video-title">{selectedVideo.title}</h1>
      <Row>
        <Col>
          <p className="select-video-details d-inline mr-1">
            {parseInt(selectedVideo.viewCount).toLocaleString()} views
          </p>
          <p className="select-video-details d-inline mr-1">•</p>
          <Moment
            format="MMM DD, YYYY"
            className="select-video-details d-inline"
          >
            {selectedVideo.publishedAt}
          </Moment>
        </Col>
        <Col className="text-right">
          <i
            className="fas fa-thumbs-up mr-1 d-inline"
            style={{ color: likeColor }}
            onClick={() => props.handleLike(selectedVideo)}
          ></i>
          <p className="mr-3 d-inline select-video-details">
            {Math.abs(likeCount) > 999
              ? `${
                  Math.sign(likeCount) * (Math.abs(likeCount) / 1000).toFixed(1)
                }K`
              : Math.sign(likeCount) * Math.abs(likeCount)}
          </p>
          <i
            className="fas fa-thumbs-down mr-1 d-inline"
            style={{ color: dislikeColor }}
            onClick={() => props.handleDislike(selectedVideo)}
          ></i>
          <p className="d-inline select-video-details">
            {Math.abs(dislikeCount) > 999
              ? `${
                  Math.sign(dislikeCount) *
                  (Math.abs(dislikeCount) / 1000).toFixed(1)
                }K`
              : Math.sign(dislikeCount) * Math.abs(dislikeCount)}
          </p>
        </Col>
      </Row>
      <hr className="mt-2 mb-2" />
      {selectedVideo.description}
      <div>
        <RelatedVideoList relatedVideos={relatedVideos} />
      </div>
    </div>
  );
};

export default SelectedVideo;
