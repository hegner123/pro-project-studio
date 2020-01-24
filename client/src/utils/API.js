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
  // updateNotes: function (id, projectData) {
  //   return axios.put("/api/projects/" + id, projectData);
  // }
//   // Deletes the book with the given id
//   deleteBook: function(id) {
//     return axios.delete("/api/books/" + id);
//   },
//   // Saves a book to the database
//   saveBook: function(bookData) {
//     return axios.post("/api/books", bookData);
//   }

};


