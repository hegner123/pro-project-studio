const router = require("express").Router();
const projectController = require("../../controllers/projectController");

// Matches with "/api/projects"
router.route("/")
  .get(projectController.findAll)
  
  // .post(projectController.create);

// Matches with "/api/projects/:id"
router
  .route("/:id")
  .get(projectController.findById)
  .put(projectController.update)
  
//   .delete(booksController.remove);

router 
  .route("/addnote/:id")
  .get(projectController.findById)
  .put(projectController.addNote)

module.exports = router;