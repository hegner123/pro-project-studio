const router = require("express").Router();
const projectController = require("../../controllers/projectController");
const User = require("../../models/User");

// Matches with "/api/projects"
router.route("/")
  .get(projectController.findAll)
  .post(projectController.create);

// Matches with "/api/projects/:id"
router
  .route("/:id")
  .get(projectController.findById)
  .delete(projectController.remove)
  
//   .put(booksController.update)
//   .delete(booksController.remove);

router
  .route("/:id/songs")
  .post(projectController.pushSong)

  router
  .route("/api/projects/:id/songs/:songId")
  .post(projectController.pushInstruments)
  .put(projectController.update)
  
//   .delete(booksController.remove);

router 
  .route("/addnote/:id")
  .get(projectController.findById)
  .put(projectController.addNote)

module.exports = router;