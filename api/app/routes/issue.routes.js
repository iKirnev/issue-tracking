module.exports = app => {
  const issues = require("../controllers/issue.controller.js");
  const multer  = require('multer')
  const upload = multer({ dest: 'uploads/' })

  var router = require("express").Router();

  // Create a new Issue
  router.post("/", upload.single('file'), issues.create);

  // Retrieve all Issues
  router.get("/", issues.getLast);

  // Update a Issue with id
  router.put("/:id", issues.update);

  app.use('/api/issues', router);
};
