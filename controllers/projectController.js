const Project = require("../models/Project");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    console.log("param for findall: ", req.params.id)
    Project
      .find({members: req.params.id})
      // .sort({ date: -1 })
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
    Project
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  addNote: function(req, res) {
    Project
    .findOneAndUpdate({ _id: req.params.id},{$push: {["songs." + [req.body.index] + ".song_notes"]: req.body.newNote}})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  removeNote: function(req, res) {
    console.log("req.body.id: ", req.params.id)
    console.log("req.body.index: ", req.body.index)
    console.log("req.body.query: ", req.body.id)
    console.log("songs." + [req.body.index] + ".song_notes");
    Project
    .findOneAndUpdate({ _id: req.params.id},{$pull: {["songs." + [req.body.index] + ".song_notes"]: {_id: req.body.id}}})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    Project
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  // update: function(req, res) {
  //   Project
  //     .findOneAndUpdate({ _id: req.params.id }, req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },

  remove: function(req, res) {
    Project
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  pushSong: function(req,res){
    console.log(req.body)
    const songTitle = req.body.song_title;
    const songKey = req.body.song_key;
    const songBpm = req.body.song_bpm;
    const songLyrics = req.body.song_lyrics;
    const songReferences = req.body.song_references;
    const newSong = {
      song_title: songTitle,
      song_key: songKey,
      song_bpm: songBpm,
      song_lyrics: songLyrics,
      song_references: songReferences
     };
    
    Project
    .findOneAndUpdate({
      _id: req.params.id
    }, {
      $push: {
        songs: newSong
      }
    })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },

  pushInstruments: function(req, res){
    let newInstruments = req.body.instruments
    Project.
  findOneAndUpdate({ _id: req.body.id }).
  where(song._id).equals(req.body.songId).
  $push({song_arrangements:newInstruments})
  
  .then(dbModel => res.json(dbModel))
  .catch(err => res.status(422).json(err));
  }


};
