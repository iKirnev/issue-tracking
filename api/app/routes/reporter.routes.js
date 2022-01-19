module.exports = app => {
  const reporters = require("../controllers/reporter.controller.js");

  var router = require("express").Router();


  // Retrieve all Tutorials
  router.get("/", reporters.findAll);
  app.use('/api/reporters', router);
};
