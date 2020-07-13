import React, { Component } from 'react';

export default class VideoItem extends Component {
    render() {
        const { video, videoStats } = this.props;

        // console.log(videoStats);
        return (
            <div onClick={() => this.props.handleVideoSelect(video)}>
                <h4>{video.snippet.title}</h4>
                <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={`${video.id.videoId}`}
                />
                {/* <p>{videoStats.items[0].statistics.viewCount}</p> */}
            </div>
        );
    }
}