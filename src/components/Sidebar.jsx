import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Sidebar = () => {
    return (
        <Navbar className="pl-0">
            <Nav>
                <ul className="list-group">
                    <li className="sidebarItems">
                        <Nav.Item>
                            <Nav.Link href="/liked-videos" className="pl-0">Liked videos</Nav.Link>
                        </Nav.Item>
                    </li>
                    <li className="sidebarItems">
                        <Nav.Item>
                            <Nav.Link href="/search-history" className="pl-0">Search history</Nav.Link>
                        </Nav.Item>
                    </li>
                </ul>
            </Nav>
        </Navbar>
    );
}

export default Sidebar;



// export default class Sidebar extends Component {
//     render() {
//         return (
//             <Navbar className="pl-0">
//                 <Nav>
//                     <ul className="list-group">
//                         <li className="sidebarItems">
//                             <Nav.Item>
//                                 <Nav.Link href="/liked-videos" className="pl-0">Liked videos</Nav.Link>
//                             </Nav.Item>
//                         </li>
//                         <li className="sidebarItems">
//                             <Nav.Item>
//                                 <Nav.Link href="/search-history" className="pl-0">Search history</Nav.Link>
//                             </Nav.Item>
//                         </li>
//                     </ul>
//                 </Nav>
//             </Navbar>
//         );
//     }
// }