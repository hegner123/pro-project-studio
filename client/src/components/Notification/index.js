import React from "react";
// import { Link } from "react-router-dom";

// import bootstrap components
import { Modal, Button} from 'react-bootstrap';
//import API from "../../utils/API";

function Notification(props) {
  return (
    <Modal show={props.show} onHide={props.onHide} >
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
      </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Notification;