import React, { Component } from 'react';

export default class VideoItem extends Component {
    render() {
        const { video } = this.props;

        return (
            <div onClick={() => this.props.handleVideoSelect(video)}>
                <h4>{video.title}</h4>
                <img
                    src={video.thumbnailMedium}
                    alt={`${video.id}`}
                />
                <p>{video.viewCount}</p>
            </div>
        );
    }
}