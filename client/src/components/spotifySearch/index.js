import React from "react";
import { Button } from "react-bootstrap";
import API from "../../utils/API"


export class SpotifySearch extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    search:"",
    link:"",
    artist:"",
    title:""
    }
    
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

spotifySearch = () => {
  API.spotifyPreview(this.state.search)
  .then(res => this.setState({link:res.data.songLink, title: res.data.title, artist: res.data.artist}))
}

render(){
  return (
    <div className="ml-auto">
       <div className="form-row">
        <label className="form-label">
          Search Spotify:
          <input  type="text" className="form-control" name={"search"}
          value={this.state.search}
          onChange={this.handleInputChange} />
        </label>
        </div>
      <Button onClick={()=>this.spotifySearch()}>Search Spotify</Button>
      <div>

      <p>{this.state.artist} <a href={this.state.link} target="_none" className="">{this.state.title}</a> </p>
  </div>
      </div>


  )
}
  };

  export default SpotifySearch;