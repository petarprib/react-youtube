import React, { useEffect } from "react";
import { useParams } from "react-router";
import SearchResultItem from "./SearchResultItem";

const SearchResultList = (props) => {
  const { searchTerm } = useParams();

  useEffect(() => {
    if (props.DEPLOYMENT === false) props.handleSearch(searchTerm);
  }, [searchTerm]);

  const searchResults = props.searchResults.map((video, i) => (
    <SearchResultItem key={i} video={video} />
  ));

  return (
    <>
      <h6>Search results</h6>
      <div className="mt-3">{searchResults}</div>
    </>
  );
};

export default SearchResultList;
