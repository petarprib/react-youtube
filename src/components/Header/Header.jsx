import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";
import {
  Row,
  Col,
  Image,
  Form,
  FormGroup,
  InputGroup,
  Button,
} from "react-bootstrap";

const SearchBar = (props) => {
  const { push } = useHistory();
  const [searchTerm, setSearchTerm] = useState("");

  let handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.length > 0) {
      props.handleSearchHistory(searchTerm);
      push(`/results/${searchTerm.replace(/ /g, "+")}`);
    }
  };

  return (
    <Row className="header mb-2">
      <Col
        xs={6}
        sm={4}
        md={3}
        xl={4}
        className="burger-and-logo d-flex align-items-center"
      >
        <i className="fas fa-bars" onClick={() => props.showSidebar()}></i>
        <Image
          alt="youtube"
          src="https://ik.imagekit.io/w1xennnidd/ytlogo_NHS_rYhNB.svg"
          className="ytlogo"
          onClick={() => push("/")}
        />
      </Col>
      <Col xs={6} sm={8} md={6} xl={4} id="searchbar">
        <Form className="mt-3" onSubmit={(e) => handleSubmit(e)}>
          <FormGroup>
            <InputGroup className="px-0" sm={12}>
              <Form.Control
                className="shadow-none"
                size="sm"
                placeholder="Search"
                onChange={(e) => handleChange(e)}
                value={searchTerm}
              />
              <InputGroup.Append>
                <Button
                  id="search-button"
                  className="shadow-none"
                  size="sm"
                  type="submit"
                >
                  <i className="fas fa-search"></i>
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </FormGroup>
        </Form>
      </Col>
    </Row>
  );
};

export default SearchBar;
