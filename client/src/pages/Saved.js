import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
// import Jumbotron from "../components/Jumbotron";
// import API from "../utils/API";

class Saved extends Component {
  state = {
    book: {}
  };


  render() {
    return (
      <Container fluid>
        saved page
      </Container>
    );
  }
}

export default Saved;
