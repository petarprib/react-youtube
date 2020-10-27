import React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';

const VideoItem = (props) => {
    const { push } = useHistory();
    let { video, selectVideo } = props;

    let thumbnail;

    if (selectVideo) {
        thumbnail =
            <Col xs={5} sm={4} lg={5} className="pl-0 r-1">
                <img src={video.thumbnailMedium} alt={`${video.id}`} className="w-100" />
            </Col>
    } else {
        thumbnail =
            <Col xs={6} sm={5} lg={4} xl={3} className="pl-0">
                <img src={video.thumbnailMedium} alt={`${video.id}`} className="w-100" />
            </Col>
    }

    return (
        <Row className="pointer mb-4 video-item" onClick={() => {
            props.handleVideoSelect(video);
            push(`/video/${video.id}`);
        }}>
            {thumbnail}
            <Col className="pl-0">
                <p className="videos-title mb-0 text-truncate">{video.title}</p>
                <p className="videos-details d-inline mr-1 mb-0">{parseInt(video.viewCount).toLocaleString()} views</p>
                <p className="videos-details d-inline mr-1 mb-0">•</p>
                <Moment fromNow className="videos-details d-inline">{video.publishedAt}</Moment>
                <div>
                    <p className="videos-descr">{selectVideo === null && video.description}</p>
                </div>
            </Col>
        </Row>
    );
}

export default VideoItem;