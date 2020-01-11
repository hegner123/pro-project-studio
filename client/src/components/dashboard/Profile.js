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
        images: [],
        imageUrls: [],
        message: ''
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
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are now at profile page!
              </p>
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
        <row>
        <div className="col-sm-12">
                <h1>Image Uploader</h1><hr/>
                <div className="col-sm-4">
                    <input className="form-control " type="file" onChange={this.selectImages} multiple/>
                </div>
                <p className="text-info">{this.state.message}</p>
                <br/><br/><br/>
                <div className="col-sm-4">
                    <button className="btn btn-primary" value="Submit" onClick={this.uploadImages}>Submit</button>
                </div>
            </div>


            <div className="row col-lg-12">
                {
                this.state.imageUrls.map((url, i) => (
                <div className="col-lg-2" key={i}>
                    <img src={BASE_URL + url} className="img-rounded img-responsive" alt="not available"/><br/>
                </div>
                ))
                }
            </div>
        </row>
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
