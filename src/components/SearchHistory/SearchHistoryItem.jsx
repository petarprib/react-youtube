import React from "react";
import { useHistory } from "react-router-dom";
import "./SearchHistory.css";
import Moment from "react-moment";
import { Row, Col, Button } from "react-bootstrap";

const SearchHistoryItem = (props) => {
  const { push } = useHistory();
  const { search } = props;

  return (
    <>
      <hr />
      <Row className="mb-3">
        <Col className="pr-0">
          <p>"{search.searchTerm}"</p>
          <Moment fromNow className="videos-details">
            {search.time}
          </Moment>
        </Col>
        <Col className="d-flex align-items-center justify-content-center">
          <Button
            id="open-results"
            className="shadow-none"
            size="sm"
            onClick={() =>
              push(`/results/${search.searchTerm.replace(/ /g, "+")}`)
            }
          >
            Open results
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default SearchHistoryItem;
