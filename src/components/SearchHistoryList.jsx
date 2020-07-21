import React, { Component } from 'react';
import SearchHistoryItem from './SearchHistoryItem';

export default class SearchHistoryList extends Component {
    render() {
        let { searchHistory } = this.props;

        if (!searchHistory.length) {
            return <p>You have not searched for any videos</p>
        } else {
            let searchHistory = searchHistory.reverse().map((search, i) => {
                return (
                    <SearchHistoryItem
                        key={i}
                        search={search}
                    />
                );
            });

            return (
                <div>
                    <h1>Liked videos</h1>
                    {searchHistory}
                </div>
            );
        }
    }
}