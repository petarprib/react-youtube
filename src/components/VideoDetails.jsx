import React, { Component } from 'react';

export default class VideoDetails extends Component {
    render() {
        let { selectedVideo } = this.props;
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
                <h1>
                    {selectedVideo.title}
                </h1>
                <p>{selectedVideo.description}</p>
                <p>{selectedVideo.publishedAt}</p>
            </div>
        );
    }
}
