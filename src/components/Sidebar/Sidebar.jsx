import React from "react";
import { useHistory } from "react-router-dom";
import "./Sidebar.css";
import { Image, Nav } from "react-bootstrap";

const Sidebar = (props) => {
  const { push } = useHistory();

  return (
    <Nav className={props.sidebar ? "nav-menu active" : "nav-menu"}>
      <ul className="nav-list">
        <li>
          <div className="d-flex align-items-center sidebar-top-section">
            <i
              className="fas fa-times text-center"
              onClick={() => props.showSidebar()}
            ></i>
            <Image
              alt="youtube"
              src="https://ik.imagekit.io/w1xennnidd/ytlogo_NHS_rYhNB.svg"
              className="ytlogo"
              onClick={() => push("/")}
            />
          </div>
        </li>
        <li>
          <Nav.Item>
            <Nav.Link href="/liked-videos" className="pl-0 nav-item">
              Liked videos
            </Nav.Link>
          </Nav.Item>
        </li>
        <li>
          <Nav.Item>
            <Nav.Link href="/search-history" className="pl-0 nav-item">
              Search history
            </Nav.Link>
          </Nav.Item>
        </li>
      </ul>
    </Nav>
  );
};

export default Sidebar;
