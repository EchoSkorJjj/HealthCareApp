import React from "react";
import './DrawOutline.css';

const DrawOutlineButton = ({ children, ...rest }) => {
    return (
        <div className="myButton">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {children}
        </div>
    );
  };

export default DrawOutlineButton;
