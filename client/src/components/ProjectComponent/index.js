import React from "react";
import { Link } from "react-router-dom";
import './style.css';

function ProjectComponent(props) {
  return (
    <div className="resultBox">
      <div className= "projectBox" >
      <h5 className="project-title">{props.title}</h5>
      <p>Client Name: {props.company}</p>
      <div className="btn-box">
      <Link to={"/dashboard/projects/" + props.id}>
                 <button className="btn btn-sm btn-light">View Project</button>
      </Link>
      </div>
      </div>
    </div>
  );
}

export default ProjectComponent;