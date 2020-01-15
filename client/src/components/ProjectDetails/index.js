import React from "react";
import "./style.css";



// import { PromiseProvider } from "mongoose";

function ProjectDetail(props) {
  return (
    <div className="project-details">
      <div className= "details-box" >
      <p>Members: {props.members} </p>
      <p>Project Title: {props.projectTitle}</p>
      </div>
    </div>
  );
}

export default ProjectDetail;