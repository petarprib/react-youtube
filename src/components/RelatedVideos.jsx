import React, { Component } from 'react';
import RelatedVideo from './RelatedVideo';

export default class RelatedVideos extends Component {
    render() {
        console.log(this.props);
        const relatedVideos = this.props.relatedVideos.map((video, i) => {
            return (
                <RelatedVideo
                    key={i}
                    video={video}
                    handleVideoSelect={this.props.handleVideoSelect}
                />
            );
        })
        return (
            <div>
                {/* {relatedVideos} */}
            </div>
        );
    }
}
