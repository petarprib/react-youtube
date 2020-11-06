import React from "react";
import SearchHistoryItem from "./SearchHistoryItem";

const SearchHistoryList = (props) => {
  if (!props.searchHistory.length) {
    return <p>You have not searched for any videos</p>;
  } else {
    let searchHistory = props.searchHistory.map((search, i) => (
      <SearchHistoryItem key={i} search={search} />
    ));

    return (
      <div>
        <h1>Search history</h1>
        {searchHistory.reverse()}
      </div>
    );
  }
};

export default SearchHistoryList;
