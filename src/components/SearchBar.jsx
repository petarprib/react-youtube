import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBar = (props) => {
    const [searchTerm, setSearchTerm] = useState("");

    let handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        props.handleSearch(searchTerm);
    }

    return (
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group>
                <Form.Control
                    onChange={(e) => handleChange(e)}
                    value={searchTerm}
                />
                <Button type="submit">Search</Button>
            </Form.Group>
        </Form >
    );
}

export default SearchBar;