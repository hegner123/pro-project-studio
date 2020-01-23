import React, { Component } from "react";
import "./style.css";
import Image from "./images/Image1.svg";


import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";


class Landing extends Component {
  render() {
    return (
      <div>
     <Container>
       <div className="row full">

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
       </Container>
       <div className="container-fluid box-bg">
         <Container>
       <Row>
           <Col xs={12}>
         <h1 className="text-white mt-5" id="what-is-pro-project-studio">What is Pro-Project Studio?</h1>
         </Col>
       </Row>
       
       <Row bsPrefix="margin row">
         <Col xs={12} md={4}>
           <h3>We know what works</h3>
           <p>Recording engineers have been using the same method of tracking recording sessions since the 60's. The famous grid with x's and checks. Pro-Project Studio takes this interface and chucks it online to make it accesable anywhere.</p>
         </Col>

         <Col xs={12} md={4}>
           <h3>Help your clients help you</h3>
           <p>What's worse than an out of tune guitar? A vocalist that's out of the loop. Ensure your clients are on the same page as you. Spend more time recording and less time answering emails or texts.</p>
         </Col>

         <Col xs={12} md={4}>
           <h3>"Make it sound like "</h3>
           <p>Make it easy for your clients to communicate their artistic vision. Our utilization of Spotify's API allows you to preview reference material right in the browser.</p>
         </Col>
      </Row>

       </Container>
       </div>

       </div>
    );
  }
}

export default Landing;
