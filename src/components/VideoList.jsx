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
                {this.props.selectVideo === null ? null : <h6>Related videos</h6>}
                <hr className="mt-3 mb-3" />
                {videoItems}
            </div>
        )
    }
}