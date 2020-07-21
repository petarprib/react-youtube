import React, { Component } from 'react';
import Moment from 'react-moment';

export default class SearchHistoryItem extends Component {
    render() {
        let { search } = this.props;

        return (
            <div>
                <p>{search.searchTerm}</p>
                <Moment fromNow>{search.time}</Moment>
            </div>
        );
    }
}