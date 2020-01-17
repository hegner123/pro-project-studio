import React from "react";
import { Link } from "react-router-dom";
import './style.css';

function ProjectComponent(props) {
  return (
    
      <div className= "test-one col-md-4 " >
      <h5 className="project-title">{props.title}</h5>
      <p>Client Name: {props.company}</p>
      <div className="btn-box">
      <Link to={"/dashboard/projects/" + props.id}>
                 <button className="btn btn-sm btn-light">View Project</button>
      </Link>
      </div>
      </div>
    
  );
}

export default ProjectComponent;