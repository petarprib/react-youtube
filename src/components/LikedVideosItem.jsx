import React, { Component } from 'react';
import { Image } from 'react-bootstrap';

export default class LikedVideosItem extends Component {
    render() {
        let { video } = this.props;

        return (
            <div onClick={() => this.props.handleVideoSelect(video)}>
                <Image src={video.thumbnailMedium} />
                <p>{video.title}</p>
            </div>
        );
    }
}