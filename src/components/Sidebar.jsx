import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export default class Sidebar extends Component {
    render() {
        return (
            <Navbar>
                <Nav>
                    <Nav.Link href="/liked-videos">Liked videos</Nav.Link>
                    <Nav.Link href="/search-history">Search history</Nav.Link>
                </Nav>
            </Navbar>

            // <Row>
            //     <Col xs={1} className="sidebar">
            //         <Navbar>

            //         </Navbar>
            //     </Col>
            // </Row>
        );
    }
}