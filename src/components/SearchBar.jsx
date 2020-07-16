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
            // <form onSubmit={this.handleSubmit}>
            //     <input
            //         onChange={this.handleChange}
            //         value={this.state.searchTerm}
            //     />
            //     <button>Search</button>
            // </form>

            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Control
                        onChange={this.handleChange}
                        value={this.state.searchTerm}
                    />
                </Form.Group>
                <Button variant="primary">Search</Button>
            </Form>
        );
    }
}