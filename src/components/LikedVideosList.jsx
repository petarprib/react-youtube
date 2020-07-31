import React from 'react';
import LikedVideosItem from './LikedVideosItem';

const LikedVideosList = (props) => {
    if (!props.likedVideos.length) {
        return <p>You have not liked any videos</p>
    } else {
        let likedVideos = props.likedVideos.reverse().map((video, i) => {
            return (
                <LikedVideosItem
                    key={i}
                    video={video}
                    handleVideoSelect={props.handleVideoSelect}
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

export default LikedVideosList;