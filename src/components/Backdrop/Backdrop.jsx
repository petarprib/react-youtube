import React from "react";
import "./Backdrop.css";

const Backdrop = (props) => {
  return <div className={props.sidebar ? "backdrop" : "nothing"}></div>;
};

export default Backdrop;
