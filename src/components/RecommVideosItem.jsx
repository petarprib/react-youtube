import React, { Component } from 'react'

export default class RecommVideosItem extends Component {
    render() {
        let { video } = this.props;

        return (
            <div onClick={() => this.props.handleVideoSelect(video)}>
                <h4>{video.title}</h4>
                <img
                    src={video.thumbnailMedium}
                    alt={`${video.id}`}
                />
                <p>{video.viewCount}</p>
            </div>
        )
    }
}
