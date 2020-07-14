import React, { Component } from 'react'

export default class RelatedVideo extends Component {
    render() {
        const { video } = this.props;
        // console.log(this.props.video)
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
