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

        // if (this.props.selectedVideo === null) {
        //     return (
        //         <div>
        //             <h1>Search results</h1>
        //             {videoItems}
        //         </div>
        //     );
        // } else {
        //     return (
        //         <div>
        //             <h1>Related videos</h1>
        //             {videoItems}
        //         </div>
        //     );
        // }

        return (
            <div>
                {this.props.selectedVideo === null ? <h1>Search results</h1> : <h1>Related videos</h1>}
                {videoItems}
            </div>
        )
    }
}