import React, { useState } from 'react';
import { Form, Button, InputGroup, FormGroup } from 'react-bootstrap';

const SearchBar = (props) => {
    const [searchTerm, setSearchTerm] = useState("");

    let handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm !== "") {
            props.handleSearch(searchTerm);
        }
    }

    return (
        <Form className="mt-3" onSubmit={(e) => handleSubmit(e)}>
            <FormGroup>
                <InputGroup className="px-0 col-sm-12 col-md-6">
                    <Form.Control
                        className="shadow-none"
                        size="sm"
                        placeholder="Search"
                        onChange={(e) => handleChange(e)}
                        value={searchTerm}
                    />
                    <InputGroup.Append>
                        <Button id="search-button" className="shadow-none" size="sm" type="submit">
                            <i className="fas fa-search"></i>
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </FormGroup>
        </Form >
    );
}

export default SearchBar;