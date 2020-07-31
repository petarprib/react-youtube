import React from 'react';
import VideoItem from './VideoItem';

const VideoList = (props) => {
    const videoItems = props.videosData.map((video, i) => {
        return (
            <VideoItem
                key={i}
                video={video}
                selectVideo={props.selectVideo}
                handleVideoSelect={props.handleVideoSelect}
            />
        );
    });

    return (
        <div>
            <div>
                {props.selectVideo !== null && <h6>Related videos</h6>}
                <hr className="mt-3 mb-3" />
                {videoItems}
            </div>
        </div>
    );
}

export default VideoList;
