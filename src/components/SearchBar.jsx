import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

export default class SearchBar extends Component {
    state = {
        searchTerm: ""
    }

    handleChange = (event) => {
        this.setState({ searchTerm: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.handleSearch(this.state.searchTerm);
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Control
                        onChange={this.handleChange}
                        value={this.state.searchTerm}
                    />
                    <Button type="submit">Search</Button>
                </Form.Group>
            </Form>
        );
    }
}