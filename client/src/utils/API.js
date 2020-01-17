import axios from "axios";

export default {
  // Gets all projects
  getProjects: function() {
    return axios.get("/api/projects");
  },
    // Gets the book with the given id
  getProject: function(id) {
    return axios.get("/api/projects/" + id);
  },
//   // Deletes the book with the given id
//   deleteBook: function(id) {
//     return axios.delete("/api/books/" + id);
//   },
//   // Saves a book to the database
  saveProject: function(projectData) {
    return axios.post("/api/project", projectData);
  },

  updateProject: function(projectData, id){
    return axios.put("/api/project" + id, projectData)
  }

};


