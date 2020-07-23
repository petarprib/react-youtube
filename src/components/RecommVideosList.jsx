import React, { Component } from 'react';
import RecommVideosItem from './RecommVideosItem';

export default class RecommVideosList extends Component {
    render() {
        let recommendedVideos = this.props.recommendedVideos;
        for (let i = recommendedVideos.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [recommendedVideos[i], recommendedVideos[j]] = [recommendedVideos[j], recommendedVideos[i]];
        }

        recommendedVideos = recommendedVideos.map((video, i) => {
            return (
                <RecommVideosItem
                    key={i}
                    video={video}
                    handleVideoSelect={this.props.handleVideoSelect}
                />
            );
        });

        return (
            <div>
                <h1>Recommended videos</h1>
                {recommendedVideos}
            </div>
        );
    }
}