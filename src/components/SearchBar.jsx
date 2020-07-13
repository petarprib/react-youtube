import React, { Component } from 'react';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';

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
            <form onSubmit={this.handleSubmit}>
                <input
                    onChange={this.handleChange}
                    value={this.state.searchTerm}
                />
                <button>Search</button>
            </form>

            // <Form onSubmit={this.handleSubmit}>
            //     <Form.Group>
            //         <Form.Control
            //             onChange={this.handleChange}
            //             value={this.state.searchTerm}
            //         />
            //     </Form.Group>
            //     <Button>Search</Button>
            // </Form>
        );
    }
}