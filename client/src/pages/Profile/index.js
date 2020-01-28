import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from 'axios';
const BASE_URL = 'http://localhost:5000/';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
        
    }   
}

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  selectImages = (event) => {
    let images = []
    for (var i = 0; i < event.target.files.length; i++) {
      images[i] = event.target.files.item(i);
    }
    images = images.filter(image => image.name.match(/\.(jpg|JPG|JPEG|jpeg|PNG|png|gif|mp3)$/))
    let message = `${images.length} valid image(s) selected`
    this.setState({ images, message })
  }

  uploadImages = () => {
    const uploaders = this.state.images.map(image => {
      const data = new FormData();
      data.append("image", image, image.name);

      // Make an AJAX upload request using Axios
      return axios.post(BASE_URL + 'upload', data)
        .then(response => {
          this.setState({
            imageUrls: [response.data.imageUrl, ...this.state.imageUrls]
          });
        })
    });

    // Once all the files are uploaded
    axios.all(uploaders).then(() => {
      console.log('done');
    }).catch(err => alert(err.message));
  }

  render() {
    const { user } = this.props.auth;

    return (
      <div style={{ height: "75vh" }} className={"container"}>
        <div className="row">
          <div className="col-12 m-5">
    <h1 className="text-white">{user.firstName} {user.lastName}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
          
          </div>

        </div>
  
      </div>
    );
  }
}

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Profile);
