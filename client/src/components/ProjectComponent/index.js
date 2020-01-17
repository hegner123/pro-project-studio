import React from "react";
import { Link } from "react-router-dom";
import './style.css';
// import bootstrap components
import { ListGroup, Col, Tab, } from 'react-bootstrap';

function ProjectComponent(props) {
  return (
    <div className="resultBox">
      {/* <div className= "projectBox" >
    
      <div className= "test-one col-md-4 " >
      <h5 className="project-title">{props.title}</h5>
      
      <div className="btn-box">
      <Link to={"/dashboard/projects/" + props.id}>
                 <button className="btn btn-sm btn-light">View Project</button>
      </Link>
      </div>
<<<<<<< HEAD
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
=======
      </div>
    
>>>>>>> 455e27b5aa7716a31b54a090035a2e9b12472916
  );
}

export default ProjectComponent;