const mongoose = require("mongoose");
const Project = require("../models/Project");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGOprojects_URI ||
  "mongodb://localhost/mernauth"
);

const projectSeed = [
  {
    title: "Project1",
    song: [{song_title: "Song Title 1",
            song_arrangements: ["guitar", "piano", "drum"],
            song_key: "Fm",
            song_bpm: 150,
            song_notes: [{notes:"there's no note"}]
          }],
    members: ["things 1", "thing2"],
    total_arrangements: 3,
    companyName: "ABC"
  },
  {
    title: "Project2",
    song: [
      { song_title: "Song Title 2-1",
        song_arrangements: ["guitar1", "orchestra", "drum", "guitar2", "guitar3"],
        song_key: "Bm",
        song_bpm: 120,
        song_notes: [{notes:"there's no note 2-1"}]
      },
      { song_title: "Song Title 2-2",
        song_arrangements: ["drum", "orchestra", "trumpet"],
        song_key: "Am",
        song_bpm: 90,
        song_notes: [{notes:"there's no note 2-2"}]
      }
    ],
    members: ["member 1", "member 2"],
    total_arrangements: 6,
    companyName: "Verizon"
  },
  {
    title: "Project3",
    song: [{song_title: "Song Title 3-1",
            song_arrangements: ["guitar", "piano", "drum"],
            song_key: "Fm",
            song_bpm: 150,
            song_notes: [{notes:"there's no note"}]
          }],
    members: ["thing 3-1", "thing 3-2"],
    total_arrangements: 3,
    companyName: "Netflix"
  },
  {
    title: "Project4",
    song: [{song_title: "Song Title 4-1",
            song_arrangements: ["guitar", "piano", "drum"],
            song_key: "Am",
            song_bpm: 150,
            song_notes: [{notes:"there's no note"}]
          }],
    members: ["thing 3-1", "thing 3-2"],
    total_arrangements: 3,
    companyName: "Netflix"
  },
  {
    title: "Project5",
    song: [{song_title: "Song Title 5-1",
            song_arrangements: ["bass1", "drum", "guitar1", "guitar2"],
            song_key: "G",
            song_bpm: 80,
            song_notes: [{notes:"there's no note"}]
          }],
    members: ["thing 5-1", "thing 5-2"],
    total_arrangements: 4,
    companyName: "Netflix"
  }
];


Project
  .remove({})
  .then(() => Project.insertMany(projectSeed))
  .then(data => {
    console.log(data + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
