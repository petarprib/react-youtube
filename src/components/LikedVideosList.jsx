import React, { Component } from 'react';
import LikedVideosItem from './LikedVideosItem';

export default class LikedVideos extends Component {
    render() {
        if (!this.props.likedVideos.length) {
            return <p>You have not liked any videos</p>
        } else {
            let likedVideos = this.props.likedVideos.reverse().map((video, i) => {
                return (
                    <LikedVideosItem
                        key={i}
                        video={video}
                    />
                );
            });

            return (
                <div>
                    <h1>Liked videos</h1>
                    {likedVideos}
                </div>
            );
        }
    }
}