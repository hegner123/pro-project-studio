import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./style.css";
import API from "../../utils/API";
// import ProjectDetail from "../../components/ProjectDetails";
// import Table from "../../components/Table";
import HeatMap from "react-heatmap-grid";


class ProjectDashboard extends Component {
  state = {
    project: [],
    songs: [],
    songList: [],
    arrangement: [],
    data: [[1, 2], [3, 4]]
  };

  // onLogoutClick = e => {
  //   e.preventDefault();
  //   this.props.logoutUser();
  // };

  componentDidMount() {
    console.log('props.match.params.id', this.props.match.params.id);
    API.getProject(this.props.match.params.id)
      .then(res => 
        {
          this.setState({ project: res.data, songs: res.data.song });
          console.log("project details array" + JSON.stringify(this.state.songs));
          this.filterData();
        }
      )
      .catch(err => console.log("whats going on", err));
  }

  filterData() {
    const tempArray = [];
    this.state.songs.forEach((item, index) => {
        if(tempArray.includes(item.song_arrangements)=== false) {
          tempArray.push(...item.song_arrangements);
        }
        this.state.songList.push(item.song_title);
      }
    )

    console.log("tempArray", tempArray);
    console.log("songList", this.state.songList);
    
    this.setState({ arrangement: tempArray });
    console.log("arr array: " + this.state.arrangement);
    let data = new Array(this.state.arrangement.length)
      .fill(0)
      .map(() =>
        new Array(this.state.songList.length).fill(0).map(() => Math.floor(Math.random() * 100))
      );
    this.setState({ data }); 
  }





  render() {
   
    console.log("render, this.state.data", this.state.data);

    return (
      <div className="container">
        <div className="row">
                    <div className="dashboard-box">
          <div className="project-container col-6">
            <h3>{this.state.project.title}</h3>
          </div>
          
                  <div className="row">
                    <div className="col-12 ml-5 mt-5">
              <HeatMap
                xLabels={this.state.songList}
                yLabels={this.state.arrangement}
                // xLabels={['test1', 'test2']}
                // yLabels={['test3', 'test4']}
                // data={[[1, 2], [3, 4]]}
                xLabelsLocation={"bottom"}
                //xLabelsVisibility={xLabelsVisibility}
                xLabelWidth={60}
                data={new Array(this.state.arrangement.length)
                  .fill(0)
                  .map(() => new Array(this.state.songList.length).fill(0).map(() => Math.floor(Math.random() * 100)))
                }
                squares
                onClick={(x, y) => this.cycle(x, y )}
                cellStyle={(background, value, min, max, data, x, y) => ({
                  fontSize: "0.5rem",
                  color: "#000"
                })}
                cellRender={value => value && `${value}%`}
              />
              </div>
              </div>
            
            
          </div>
          </div>
        </div>
        

    );
  }
}

ProjectDashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(ProjectDashboard);
