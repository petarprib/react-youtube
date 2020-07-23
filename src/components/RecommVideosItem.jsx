import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import Moment from 'react-moment';

export default class RecommVideosItem extends Component {
    render() {
        let { video } = this.props;

        return (
            <Col className="mb-3" xs={6} md={4} lg={3}>
                <div className="recommVideos" onClick={() => this.props.handleVideoSelect(video)}>
                    <img src={video.thumbnailMedium} alt={`${video.id}`} className="recommThumbnails" />
                </div>
                <div
                    className="recommVideos pt-2"
                    onClick={() => this.props.handleVideoSelect(video)}
                >
                    <p className="recommVideosTitle mb-0">{video.title}</p>
                    <p className="recommVideosViews videosDetails mr-1">{parseInt(video.viewCount).toLocaleString()} views</p>
                    <p className="bullet videosDetails mr-1">•</p>
                    <Moment fromNow className="recommVideosPublished videosDetails">{video.publishedAt}</Moment>
                </div>
            </Col>
        );
    }
}