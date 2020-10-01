import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';

const VideoDetails = (props) => {
    let { selectVideo, likedVids, dislikedVids } = props;

    let likeCount = parseInt(selectVideo.likeCount);
    let likeColor = "#606060";
    let dislikeCount = parseInt(selectVideo.dislikeCount);
    let dislikeColor = "#606060";

    for (let i = 0; i < likedVids.length; i++) {
        if (selectVideo.id === likedVids[i].id) {
            likeCount += 1;
            likeColor = "#008000";
            break;
        }
    }

    for (let i = 0; i < dislikedVids.length; i++) {
        if (selectVideo.id === dislikedVids[i].id) {
            dislikeCount += 1;
            dislikeColor = "#FF0000";
            break;
        }
    }

    return (
        <div id="select-video">
            <div className="embed-responsive embed-responsive-16by9 mb-2">
                <iframe
                    title={selectVideo.title}
                    src={`https://www.youtube.com/embed/${selectVideo.id}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            <h1 id="select-video-title">{selectVideo.title}</h1>
            <Row>
                <Col>
                    <p className="select-video-details d-inline mr-1">{parseInt(selectVideo.viewCount).toLocaleString()} views</p>
                    <p className="select-video-details d-inline mr-1">•</p>
                    <Moment format="MMM DD, YYYY" className="select-video-details d-inline">{selectVideo.publishedAt}</Moment>
                </Col>
                <Col className="text-right">
                    <i
                        className="fas fa-thumbs-up mr-1 d-inline"
                        style={{ color: likeColor }}
                        onClick={() => props.handleLike(selectVideo)}
                    ></i>
                    <p className="mr-3 d-inline select-video-details">
                        {Math.abs(likeCount) > 999 ? `${Math.sign(likeCount) * ((Math.abs(likeCount) / 1000).toFixed(1))}K` : Math.sign(likeCount) * Math.abs(likeCount)}
                    </p>
                    <i
                        className="fas fa-thumbs-down mr-1 d-inline"
                        style={{ color: dislikeColor }}
                        onClick={() => props.handleDislike(selectVideo)}
                    ></i>
                    <p className="d-inline select-video-details">
                        {Math.abs(dislikeCount) > 999 ? `${Math.sign(dislikeCount) * ((Math.abs(dislikeCount) / 1000).toFixed(1))}K` : Math.sign(dislikeCount) * Math.abs(dislikeCount)}
                    </p>
                </Col>
            </Row>
            <hr className="mt-2 mb-2" />
            {selectVideo.description}
        </div>
    );
}

export default VideoDetails;