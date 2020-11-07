import React, { useEffect } from "react";
import { useParams } from "react-router";
import "./SearchResults.css";
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
    <div>
      <h6>Search results</h6>
      <hr className="mt-3 d-none d-sm-block" />
      <div className="mt-3 video-list">{searchResults}</div>
    </div>
  );
};

export default SearchResultList;
