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
  addNote: function (id, projectData) {
    return axios.put("/api/projects/addnote/" + id, projectData);
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
  updateProject: function(projectData, id){
    return axios.put("/api/projects" + id, projectData)
  }

};


