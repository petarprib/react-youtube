import React from 'react';
import SearchHistoryItem from './SearchHistoryItem';

const SearchHistoryList = (props) => {
    if (!props.searchHistory.length) {
        return <p>You have not searched for any videos</p>
    } else {
        let searchHistory = props.searchHistory.reverse().map((search, i) => {
            return (
                <SearchHistoryItem
                    key={i}
                    search={search}
                    handleSearch={props.handleSearch}
                />
            );
        });

        return (
            <div>
                <h1>Search history</h1>
                {searchHistory}
            </div>
        );
    }
}

export default SearchHistoryList;