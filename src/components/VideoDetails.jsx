import React, { Component } from 'react';

export default class VideoDetails extends Component {
    render() {
        let { selectedVideo, likedVideos } = this.props;

        let likeCount = parseInt(selectedVideo.likeCount);
        let likeColor = "initial";

        for (let i = 0; i < likedVideos.length; i++) {
            if (selectedVideo.id === likedVideos[i].id) {
                likeCount += 1;
                likeColor = "green";
            }
        }

        return (
            <div>
                <iframe
                    title={selectedVideo.title}
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                <h3>{selectedVideo.title}</h3>
                <i
                    className="fas fa-thumbs-up thumbsup"
                    style={{ color: likeColor }}
                    onClick={() => this.props.handleLike(selectedVideo)}
                ></i>
                <p>{likeCount}</p>
                <i className="fas fa-thumbs-down"></i>
                <p>{selectedVideo.dislikeCount}</p>
                <p>{selectedVideo.description}</p>
            </div>
        );
    }
}
