import React from "react";
// import { Link } from "react-router-dom";
import './style.css';
// import bootstrap components
import { Modal, Button, Form } from 'react-bootstrap';
//import API from "../../utils/API";

function EditProject(props) {
  return (
    <Modal show={props.show} onHide={props.onHide} >
      <Modal.Header closeButton>
        <Modal.Title>Edit Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form >
          <div className="form-row">
            <label className="form-label">
              Title:
          <input type="text" className="form-control" name={"projectDetail.title"}
                id="title"
                value={props.title}
                onChange={props.handleChange} 
                />
            </label>
          </div>
          <div className="form-row">
            <label>Members:
        <input type="text" className="form-control" name={"projectMembers"}
                value={props.members}
                onChange={props.handleChange}
                />
            </label>
          </div>
          <div className="form-row">
            <label>Company:
        <input type="text" className="form-control" name={"projectDetail.companyName"}
                id="companyName"
                value={props.companyName}
                onChange={props.handleChange} 
                />
            </label>
          </div>
          {/* <input className="btn-primary" type="submit" value="Submit"
          // onClick={this.props.close, this.props.refresh} 
          /> */}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
      </Button>
        <Button variant="primary" onClick={props.save}>
          Save Changes
      </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditProject;