import React from "react";
// import { Link } from "react-router-dom";
import './style.css';
// import bootstrap components
import { Form } from 'react-bootstrap';
//import API from "../../utils/API";

function Note(props) {
  return (
    <div key={props.index} className="noteDiv">
   
    <Form.Control bsPrefix={"cust-input form-control"} type="text" 
      id={props.noteId}
      value={props.titleValue}
      onChange={props.titleOnChange}
      name={props.name}
      placeholder={"Title"} />

    <Form.Control as="textarea" rows="3"
      id={props.noteId}
      value={props.bodyValue}
      onChange={props.bodyOnChange}
      name={props.name} 
      placeholder={"Note Body area"}/>
     <span className="removeNote mt-1 ml-auto mr-1" value={props.noteId} onClick={() => props.removeNote(props.noteId)}>Delete Note</span>
  </div>
  )
}

export default Note;