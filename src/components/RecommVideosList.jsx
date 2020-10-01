import React from 'react';
import RecommVideosItem from './RecommVideosItem';
import { Row } from 'react-bootstrap';

const RecommVideosList = (props) => {
    let recommVideos = props.recommVideos;
    for (let i = recommVideos.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [recommVideos[i], recommVideos[j]] = [recommVideos[j], recommVideos[i]];
    }

    recommVideos = recommVideos.map((video, i) => {
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
            <h4 className="page-heading mb-3">Recommended</h4>
            <Row>
                {recommVideos}
            </Row>
        </div>
    );
}

export default RecommVideosList;