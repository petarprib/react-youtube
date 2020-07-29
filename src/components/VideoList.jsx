import React, { Component } from 'react';
import VideoItem from './VideoItem';

export default class VideoList extends Component {
    render() {
        const videoItems = this.props.videosData.map((video, i) => {
            return (
                <VideoItem
                    key={i}
                    video={video}
                    selectVideo={this.props.selectVideo}
                    handleVideoSelect={this.props.handleVideoSelect}
                />
            );
        })

        return (
            <div>
                {this.props.selectVideo === null ? null : <h1>Related videos</h1>}
                {videoItems}
            </div>
        )
    }
}