import React, { Component } from 'react';

export default class VideoDetails extends Component {

    handleLike = () => {
        // basically do the same with the dislike

        let likedVideos = JSON.parse(localStorage.getItem("likedVideos") || "[]");

        if (likedVideos.length) {
            for (let i = 0; i < likedVideos.length; i++) {
                if (likedVideos[i].id === this.props.selectedVideo.id) {
                    likedVideos.splice(i, 1);
                    localStorage.setItem("likedVideos", JSON.stringify(likedVideos));
                }
            }
        }


        likedVideos.push(this.props.selectedVideo);
        localStorage.setItem("likedVideos", JSON.stringify(likedVideos));
    }

    render() {
        let { selectedVideo } = this.props;

        let likeCount;
        if (selectedVideo.liked === true) {
            likeCount = parseInt(selectedVideo.likeCount) + 1;
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
                {/* <h1>{selectedVideo.liked.toString()}</h1> */}
                <h3>{selectedVideo.title}</h3>
                <i className="fas fa-thumbs-up" onClick={this.handleLike}></i>
                <p>{likeCount}</p>
                <i className="fas fa-thumbs-down"></i>
                <p>{selectedVideo.dislikeCount}</p>
                <p>{selectedVideo.description}</p>
            </div>
        );
    }
}
