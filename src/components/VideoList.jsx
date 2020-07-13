import React, { Component } from 'react';
import VideoItem from './VideoItem';

export default class VideoList extends Component {
    render() {
        const videoItems = this.props.videosData.map((video, i) => {
            return (
                <VideoItem
                    key={i}
                    video={video}
                    handleVideoSelect={this.props.handleVideoSelect}
                />
            );
        })

        return (
            <div>
                {videoItems}
            </div>
        );
    }
}