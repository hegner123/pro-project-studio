const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const projectSchema = new Schema({
  title: { type: String, required: true },
  song: [ new Schema ({
            song_title: String,
            song_arrangements: {type: Array, default: []},
            song_lyrics: String,
            song_key: String,
            song_bpm: Number,
            song_reference: String,
            song_notes: [new Schema ({
                  notes: {type: String, required: true}
            })]
        })],
  members: {type: Array, default: []},
  total_arrangements: Number
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;