import React, { useState } from "react";
// import { Image, Navbar, Nav } from "react-bootstrap";
import "./Sidebar.css";

const Sidebar = (props) => {
  return (
    <div>
      <i className="fas fa-bars" onClick={() => props.showSidebar()}></i>
      <nav className={props.sidebar ? "nav-menu active" : "nav-menu"}>
        <i className="fas fa-times" onClick={() => props.showSidebar()}></i>
        <p>Content</p>
      </nav>
    </div>
  );
};

export default Sidebar;
