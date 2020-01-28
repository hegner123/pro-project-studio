import React from "react";
import './style.css';


function ContentPane(props) {
  return (
    <div className="">
          <h3 className="text-white">{props.id}</h3>
    </div>
  )
}

export default ContentPane;