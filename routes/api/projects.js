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
  .put(projectController.update)
  
//   .put(booksController.update)
//   .delete(booksController.remove);

router
  .route("/:id/songs")
  .post(projectController.pushSong)

  router
  .route("/song/arrangement/:id")
  .post(projectController.pushInstruments)
  .put(projectController.update)

//   .delete(booksController.remove);

router
  .route("/note/add/:id")
  .get(projectController.findById)
  .put(projectController.addNote)

router
  .route("/note/remove/:id")
  .get(projectController.findById)
  .put(projectController.removeNote)

module.exports = router;