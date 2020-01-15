import React from "react";
import "./css/style.css";
import { Link } from "react-router-dom";


function ProjectComponent(props) {
  return (
    <div className="resultBox">
      <div className= "projectBox" >
      <h5>{props.title}</h5>
      <p>Company Name: {props.company}</p>
      <Link to={"/dashboard/projects/" + props.id}>
                 <button>View Project</button>
      </Link>
      </div>
    </div>
  );
}

export default ProjectComponent;