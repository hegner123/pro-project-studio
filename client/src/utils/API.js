import axios from "axios";

export default {
  // Gets all projects
  getProjects: function() {
    return axios.get("/api/projects");
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
  // updateNotes: function (id, projectData) {
  //   return axios.put("/api/projects/" + id, projectData);
  // }

//   // Deletes the book with the given id
//   deleteBook: function(id) {
//     return axios.delete("/api/books/" + id);
//   },
//   // Saves a book to the database
  saveProject: function(projectData) {
    return axios.post("/api/projects", projectData);
  },
  saveSong: function(songData, id) {
    return axios.post("/api/projects/" + id +"/songs", songData);
  },
  updateProject: function(projectData, id){
    return axios.put("/api/projects/" + id, projectData)
  },
  deleteProject: function(id){
    return axios.delete("/api/projects/" + id)
  },
  saveInstruments: function (instrumentData, id, songId){
    return axios.post("/api/projects" + id + "/songs/" + songId, instrumentData)
  },

  spotifyPreview: function (song){
    return axios.get("/api/song-preview/" + song)
  }



};


