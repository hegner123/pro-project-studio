import React, { Component } from "react";
// import DeleteBtn from "../components/DeleteBtn";
// import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";

import { Input, TextArea, FormBtn } from "../components/Form";
import SearchResults from "../components/SearchResults";

class Search extends Component {
  state = {
    search: "",
    results: []
    // books: [],
    // title: "",
    // author: "",
    // synopsis: ""
  };

  searchBook = query => {
    API.search(query)
      .then(res => { this.setState({ results: res.data.items }); 
        // console.log("result" + JSON.stringify(res.data.items[0].volumeInfo.title)) 
        console.log("Here");
        console.log(this.state.results);
      })
      .catch(err => console.log(err));

  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the Google Books API for the value of `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchBook(this.state.search);
  };

  handleSave = book => {
    // console.log("title: " + title);
    // const index = this.state.results.findIndex(i => i.volumeInfo.title === title);
    // console.log("id: " + index);
    // console.log("authors " + this.state.results[index].volumeInfo.authors[0])
    console.log("book info" + JSON.stringify(book));
    API.saveBook(book
      // title: this.state.results[index].volumeInfo.title,
      // author: this.state.results[index].volumeInfo.authors[0],
      // summary: this.state.results[index].volumeInfo.imageLinks.smallThumbnail,
      // image: this.state.results[index].volumeInfo.description,
      // link: this.state.results[index].volumeInfo.infoLink

      
    )
    .then(res => console.log("added"))
    .catch(err => console.log(err));

  };
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <form>
              <h3>Book Search</h3>
              <Input
                value={this.state.search}
                onChange={this.handleInputChange}
                name="search"
                placeholder="Title (required)"
              />
              <FormBtn
                //disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >Search</FormBtn>
            </form>
          </Col>
        </Row>
        <Col size="md-12">
          <h3>Results</h3>

          {this.state.results.map(result => (
            
            <SearchResults
              
              title = {result.volumeInfo.title}
              author = {result.volumeInfo.authors[0]}
              img = {result.volumeInfo.imageLinks.smallThumbnail}
              summary = {result.volumeInfo.description}
              link = {result.volumeInfo.infoLink}
              handleSave={this.handleSave}
            />  
            
          ))}
        </Col>
        <Row>

        </Row>

      </Container>
    );
  }
}

export default Search;
