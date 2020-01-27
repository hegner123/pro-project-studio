import React from "react";
// import { Link } from "react-router-dom";
import './style.css';
// import bootstrap components
import { Table } from 'react-bootstrap';
import API from "../../utils/API";

function ContentPane(props) {
  return (
    <div className="content-pane">
          <h3>{props.id}</h3>
    </div>
  )
}

export default ContentPane;