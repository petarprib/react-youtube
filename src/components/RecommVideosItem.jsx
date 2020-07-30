import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import Moment from 'react-moment';

export default class RecommVideosItem extends Component {
    render() {
        let { video } = this.props;

        return (
            <Col className="mb-3" xs={6} md={4} lg={3}>
                <div className="pointer" onClick={() => this.props.handleVideoSelect(video)}>
                    <img src={video.thumbnailMedium} alt={`${video.id}`} className="w-100" />
                </div>
                <div
                    className="pointer pt-1"
                    onClick={() => this.props.handleVideoSelect(video)}
                >
                    <p className="videosTitle mb-0">{video.title}</p>
                    <p className="videosDetails d-inline mr-1">{parseInt(video.viewCount).toLocaleString()} views</p>
                    <p className="videosDetails d-inline mr-1">•</p>
                    <Moment fromNow className="videosDetails d-inline">{video.publishedAt}</Moment>
                </div>
            </Col>
        );
    }
}