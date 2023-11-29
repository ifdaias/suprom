import React from "react";
import "./componentStyles/PopupForm.css";
import { useState } from "react";

const PopupForm = ({ ...props }) => {
  return (
    <div className="popupBox">
      <div className="innerBox">
        <p className="popupMessage">{props.content}</p>
        <button className="closeButton" onClick={props.handleClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default PopupForm;
