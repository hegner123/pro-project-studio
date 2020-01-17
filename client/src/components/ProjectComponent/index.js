import React from "react";
import { Link } from "react-router-dom";
import './style.css';
// import bootstrap components
import { ListGroup, Col, Tab, } from 'react-bootstrap';

function ProjectComponent(props) {
  return (
    <div className="resultBox">
      {/* <div className= "projectBox" >
      <h5 className="project-title">{props.title}</h5>
      
      <div className="btn-box">
      <Link to={"/dashboard/projects/" + props.id}>
                 <button className="btn btn-sm btn-light">View Project</button>
      </Link>
      </div>
      </div> */}

      <Col sm={4}>
              <ListGroup>
                <ListGroup.Item action href={props.title}>
                  {props.title}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col sm={8}>
              <Tab.Content>
                <Tab.Pane eventKey={props.title}>
                
                </Tab.Pane>
              </Tab.Content>
      </Col>
    </div>
  );
}

export default ProjectComponent;