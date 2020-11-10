import React from "react";
import SearchHistoryItem from "./SearchHistoryItem";

const SearchHistoryList = (props) => {
  if (!props.searchHistory.length) {
    return <p>You have not searched for any videos</p>;
  } else {
    const searchHistory = props.searchHistory.map((search, i) => (
      <SearchHistoryItem key={i} search={search} />
    ));

    return (
      <>
        <h6>Search history</h6>
        <div className="mt-3">{searchHistory.reverse()}</div>
      </>
    );
  }
};

export default SearchHistoryList;
