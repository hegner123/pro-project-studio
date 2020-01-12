const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const multer = require('multer');
const cors = require('cors');

const users = require("./routes/api/users");

//From Activity 11
// const routes = require("./routes");

const app = express();

app.use(express.static('public'))
app.use(cors());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Multer Upload
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
  cb(null, 'public/images/uploads') //this is where the file's going to be placed
},
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
}
});
const upload = multer({ storage })

// Upload Route for files
app.post('/upload', upload.single('image'), (req, res) => {
	if (req.file)
		res.json({
			imageUrl: `images/uploads/${req.file.filename}`
	});
	else
		res.status("409").json("No Files to Upload.");
});

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true,
      useCreateIndex: true, }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

// Routes from Activity 11 file
// app.use(routes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
