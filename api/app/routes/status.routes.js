module.exports = app => {
  const statuses = require("../controllers/status.controller.js");

  var router = require("express").Router();


  // Retrieve all Tutorials
  router.get("/", statuses.findAll);
  app.use('/api/statuses', router);
};
