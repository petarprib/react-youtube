import React from "react";
import { useHistory } from "react-router-dom";
import Moment from "react-moment";
import { Button } from "react-bootstrap";

const SearchHistoryItem = (props) => {
  const { push } = useHistory();
  const { search } = props;

  return (
    <div>
      <p>{search.searchTerm}</p>
      <Moment fromNow>{search.time}</Moment>
      <Button
        onClick={() => push(`/results/${search.searchTerm.replace(/ /g, "+")}`)}
      >
        Open results
      </Button>
      <hr />
    </div>
  );
};

export default SearchHistoryItem;
