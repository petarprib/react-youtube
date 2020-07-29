import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';

export default class VideoDetails extends Component {
    render() {
        let { selectVideo, likedVideos, dislikedVideos } = this.props;

        let likeCount = parseInt(selectVideo.likeCount);
        let likeColor = "#606060";
        let dislikeCount = parseInt(selectVideo.dislikeCount);
        let dislikeColor = "#606060";

        for (let i = 0; i < likedVideos.length; i++) {
            if (selectVideo.id === likedVideos[i].id) {
                likeCount += 1;
                likeColor = "#008000";
                break;
            }
        }

        for (let i = 0; i < dislikedVideos.length; i++) {
            if (selectVideo.id === dislikedVideos[i].id) {
                dislikeCount += 1;
                dislikeColor = "#FF0000";
                break;
            }
        }

        // console.log(selectVideo.description.join("").length)

        // if(selectVideo.description.join("").length > 150) {

        // }

        return (
            <div id="selectVideo">
                <iframe
                    title={selectVideo.title}
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${selectVideo.id}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                <h1 id="selectVideoTitle">{selectVideo.title}</h1>
                <Row className="">
                    <Col className="pr-0">
                        <p className="selectVideoDetails d-inline mr-1">{parseInt(selectVideo.viewCount).toLocaleString()} views</p>
                        <p className="selectVideoDetails d-inline mr-1">•</p>
                        <Moment format="MMM DD, YYYY" className="selectVideoDetails d-inline">{selectVideo.publishedAt}</Moment>
                    </Col>
                    <Col className="pl-0">
                        <i
                            className="fas fa-thumbs-up mr-1 d-inline"
                            style={{ color: likeColor }}
                            onClick={() => this.props.handleLike(selectVideo)}
                        ></i>
                        <p className="mr-3 d-inline selectVideoDetails">{likeCount}</p>
                        <i
                            className="fas fa-thumbs-down mr-1 d-inline"
                            style={{ color: dislikeColor }}
                            onClick={() => this.props.handleDislike(selectVideo)}
                        ></i>
                        <p className="d-inline selectVideoDetails">{dislikeCount}</p>
                    </Col>
                </Row>
                <hr className="mt-2 mb-2"/>
                <p>{selectVideo.description}</p>
                <hr className="mt-2 mb-2"/>
            </div>
        );
    }
}