const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const ProjectSchema = new Schema({
  title: { type: String, required: true },
  songs: [ new Schema ({
            song_title: String,
            song_arrangements: {type: Array, default: []},
            song_lyrics: String,
            song_key: String,
            song_bpm: Number,
            song_reference: String,
            song_notes: [new Schema ({
                  noteTitle: String,
                  noteBody: String,
                  noteStatus: {
                        type: Boolean,
                        default: false
                  }
            })]
        })],
  members: {type: Array, default: []},
  total_arrangements: Number,
  companyName: String
});

module.exports = Project = mongoose.model("projects", ProjectSchema);