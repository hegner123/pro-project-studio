import axios from "axios";

export default {
  // Gets all projects
  getProjects: function(id) {
    return axios.get("/api/projects/userprojects/" + id);
  },
    // Gets the project with the given id
  getProjectDetails: function(id) {
    return axios.get("/api/projects/" + id);
  },
  updateProject: function (id, projectData) {
    return axios.put("/api/projects/" + id, projectData);
  },
  addNote: function (id, noteData) {
    return axios.put("/api/projects/note/add/" + id, noteData);
  },
  removeNote: function (id, noteData) {
    return axios.put("/api/projects/note/remove/" + id, noteData);
  },

  saveProject: function(projectData) {
    return axios.post("/api/projects", projectData);
  },
  saveSong: function(songData, id) {
    return axios.post("/api/projects/" + id +"/songs", songData);
  },
  deleteProject: function(id){
    return axios.delete("/api/projects/" + id)
  },
  saveInstruments: function (instrumentData, id){
    return axios.post("/api/projects/song/arrangement/" + id , instrumentData)
  },

  spotifyPreview: function (song){
    return axios.get("/api/song-preview/" + song)
  }



};


