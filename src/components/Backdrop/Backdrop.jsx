import React from "react";
import "./Backdrop.css";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={() => props.showSidebar()}></div>;
};

export default Backdrop;
