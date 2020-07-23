import React, { Component } from 'react';
import SearchHistoryItem from './SearchHistoryItem';

export default class SearchHistoryList extends Component {
    render() {
        if (!this.props.searchHistory.length) {
            return <p>You have not searched for any videos</p>
        } else {
            let searchHistory = this.props.searchHistory.reverse().map((search, i) => {
                return (
                    <SearchHistoryItem
                        key={i}
                        search={search}
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
}