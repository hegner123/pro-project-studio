import React from "react";
import './style.css';


function ContentPane(props) {
  return (
    <div className="content-pane">
          <h3>{props.id}</h3>
    </div>
  )
}

export default ContentPane;