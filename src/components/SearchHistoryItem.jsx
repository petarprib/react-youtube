import React from 'react';
import Moment from 'react-moment';
import { Button } from 'react-bootstrap';

const SearchHistoryItem = (props) => {
    let { search } = props;

    return (
        <div>
            <p>{search.searchTerm}</p>
            <Moment fromNow>{search.time}</Moment>
            <Button onClick={() => props.handleSearch(search.searchTerm)}>Open results</Button>
            <hr />
        </div>
    );
}

export default SearchHistoryItem;