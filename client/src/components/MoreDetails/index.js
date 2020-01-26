import React from "react";
import './style.css';
// import bootstrap components
import { Accordion, Card, Button } from 'react-bootstrap';


function MoreDetails(props) {
  return (
    <div className="moreDetailsDiv">
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              More Details!
            </Accordion.Toggle>
          </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                  <h3>Client Name: {props.companyname}</h3>
                  <h3> Project Members: </h3>
                  {/* <h4></h4> */}
              </Card.Body>
            </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  )
}

export default MoreDetails;