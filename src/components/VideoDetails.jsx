import React, { Component } from 'react';

export default class VideoDetails extends Component {
    render() {
        let { selectedVideo, likedVideos, dislikedVideos } = this.props;

        let likeCount = parseInt(selectedVideo.likeCount);
        let likeColor = "initial";
        let dislikeCount = parseInt(selectedVideo.dislikeCount)
        let dislikeColor = "initial";

        for (let i = 0; i < likedVideos.length; i++) {
            if (selectedVideo.id === likedVideos[i].id) {
                likeCount += 1;
                likeColor = "#008000";
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
                    className="fas fa-thumbs-up"
                    style={{ color: likeColor }}
                    onClick={() => this.props.handleLike(selectedVideo)}
                ></i>
                <p>{likeCount}</p>
                <i
                    className="fas fa-thumbs-down"
                    style={{ color: dislikeColor }}
                    onClick={() => this.props.handleDislike(selectedVideo)}
                ></i>
                <p>{dislikeCount}</p>
                <p>{selectedVideo.description}</p>
            </div >
        );
    }
}
