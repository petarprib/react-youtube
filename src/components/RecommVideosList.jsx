import React from 'react';
import RecommVideosItem from './RecommVideosItem';
import { Row } from 'react-bootstrap';

const RecommVideosList = (props) => {
    let recommendedVideos = props.recommendedVideos;
    for (let i = recommendedVideos.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [recommendedVideos[i], recommendedVideos[j]] = [recommendedVideos[j], recommendedVideos[i]];
    }

    recommendedVideos = recommendedVideos.map((video, i) => {
        return (
            <RecommVideosItem
                key={i}
                video={video}
                handleVideoSelect={props.handleVideoSelect}
            />
        );
    });

    return (
        <div>
            <h4 className="pageHeading mb-3">Recommended</h4>
            <Row>
                {recommendedVideos}
            </Row>
        </div>
    );
}

export default RecommVideosList;