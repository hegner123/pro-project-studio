const Project = require("../models/Project");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    Project
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    Project
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    console.log("req.body.id: ", req.params.id)
    console.log("req.body: ", req.body)
    Project
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
//   Project
 //.findOneAndUpdate({ _id: req.params.id },{$push: {"songs.1.song_notes": req.body}})
//   .then(dbModel => res.json(dbModel))
//   .catch(err => res.status(422).json(err));
// }
  addNote: function(req, res) {
    Project
    .findOneAndUpdate({ _id: req.params.id},{$push: {["songs." + [req.body.index] + ".song_notes"]: req.body.newNote}})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  }
//   remove: function(req, res) {
//     Book
//       .findById({ _id: req.params.id })
//       .then(dbModel => dbModel.remove())
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   }
};
