const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String, required: true },
  song: [{
            song_title: String,
            song_arrangements: {type: Array, default: []},
            song_lyrics: String,
            song_key: String,
            song_bpm: Number,
            song_reference: String,
            song_notes: {type: Array, default: []},
        }],
  members: {type: Array, default: []},
  total_arrangements: Number
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;