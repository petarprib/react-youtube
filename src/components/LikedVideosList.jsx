import React, { Component } from 'react';
import LikedVideosItem from './LikedVideosItem';

export default class LikedVideos extends Component {
    render() {
        let likedVideos = JSON.parse(localStorage.getItem("likedVideos"));

        if (likedVideos === null) {
            return <p>You have not liked any videos</p>
        } else {
            likedVideos = likedVideos.reverse().map((video, i) => {
                return (
                    <LikedVideosItem
                        video={video}
                        key={i}
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
