import React, { Component } from "react";
import "./style.css";
import Image from "./images/Image1.svg"

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";


class Landing extends Component {
  render() {
    return (
     <Container>
       <div className="row">

         <Col xs={6}>
         <div className="header">
             <h1 className="text-white">Pro-Project Studio</h1>
             <h3 className="text-white">Make it easy for you and your clients
              to keep track of your recording projects.</h3>
           </div>
         </Col>
         <Col xs={6}>
           <img src= {Image} alt="logo" className="landing-page-img" />
         </Col>
       </div>

       <Row>
         <div className="box-bg">
           <Col xs={12}>
         this
         </Col>
         </div>
         
       </Row>

       </Container>
    );
  }
}

export default Landing;
