const express = require("express");
const mongoose = require("mongoose");
const path = require('path')
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

// Multer Upload
let storage = multer.diskStorage({
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

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/pro-project-studio" ,
    { useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex:true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

app.use("/api/users", users);

// ... other app.use middleware
app.use(express.static(path.join(__dirname, "client", "build")));

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
const port =   process.env.PORT || 3001;


app.listen(port, () => console.log(`Server up and running on port ${port} !`));
