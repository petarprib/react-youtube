import React, { Component } from 'react';
import VideoItem from './VideoItem';

export default class VideoList extends Component {
    render() {
        const videoItems = this.props.videosData.map((video, i) => {
            let videoId = video.id.videoId;
            let videoStats;

            this.props.videosStats.forEach(video => {
                if (video.items[0].id === videoId) {
                    videoStats = video;
                }
            });

            return (
                <VideoItem
                    key={i}
                    video={video}
                    videoStats={videoStats}
                    handleVideoSelect={this.props.handleVideoSelect}
                />
            );
        })

        // console.log(this.props.videosData)

        return (
            <div>
                {videoItems}
            </div>
        );
    }
}