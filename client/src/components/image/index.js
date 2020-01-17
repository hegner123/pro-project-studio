import React from "react";
import Picture from "./whiteboard.jpg"

function Image() {
  return (
    <div className="row">
      <div className="col-12 text-center">
      <img src={Picture} alt="text"/>
      </div>
    </div>
  );
}

export default Image;
