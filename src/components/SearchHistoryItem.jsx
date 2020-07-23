import React, { Component } from 'react';
import Moment from 'react-moment';
import { Button } from 'react-bootstrap';

export default class SearchHistoryItem extends Component {
    render() {
        let { search } = this.props;

        return (
            <div>
                <p>{search.searchTerm}</p>
                <Moment fromNow>{search.time}</Moment>
                <Button onClick={() => this.props.handleSearch(search.searchTerm)}>Open results</Button>
            </div>
        );
    }
}