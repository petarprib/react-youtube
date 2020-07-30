import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';

export default class VideoItem extends Component {
    render() {
        let { video, selectVideo } = this.props;

        let thumbnail;

        if (selectVideo) {
            thumbnail =
                <Col xs={5} sm={4} lg={5} className="pr-1">
                    <img
                        src={video.thumbnailMedium}
                        alt={`${video.id}`}
                        className="w-100"
                    />
                </Col>
        } else {
            thumbnail =
                <Col xs={6} sm={5} lg={4} xl={3}>
                    <img
                        src={video.thumbnailMedium}
                        alt={`${video.id}`}
                        className="w-100"
                    />
                </Col>
        }

        return (
            <Row
                onClick={() => this.props.handleVideoSelect(video)}
                className="mb-4 videoItem"
            >
                {thumbnail}
                <Col className="pl-0">
                    <p className="videosTitle mb-0 text-truncate">{video.title}</p>
                    <p className="videosDetails d-inline mr-1 mb-0">{parseInt(video.viewCount).toLocaleString()} views</p>
                    <p className="videosDetails d-inline mr-1 mb-0">•</p>
                    <Moment fromNow className="videosDetails d-inline">{video.publishedAt}</Moment>
                    <p className="videosDescr">{selectVideo ? null : video.description}</p>
                </Col>
            </Row>
        );
    }
}