const Issue = require("../models/issue.model.js");
const fs =require('fs-extra');

// Create and Save a new Issue
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const c = (req, res) =>{
    // Create a Issue
    const issue = new Issue({
      reporter_id: req.body.reporter_id,
      description: req.body.description,
      status_id: req.body.status_id,
      file_src: req.body.file_src
    });

    // Save Issue in the database
    Issue.create(issue, (err, data) => {
      if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the Issue." });
      else res.send(data);
    });
  }

  if (req.file) {
    req.body.file_src = `img/${Date.now()}-${req.file.originalname}`;
    fs.rename(req.file.path, req.body.file_src, function(err) {
      if (err) res.status(500).send({ message: err.message || "Some error occurred while creating the Issue." });
      else c(req, res);
    });
  } else c(req, res);
};

// Retrieve all Issues from the database (with condition).
exports.getLast = (req, res) => {
  Issue.getLast(req.query, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving issues."
      });
    else res.send(data);
  });
};


// Update a Issue identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Issue.updateById(
    req.params.id,
    new Issue(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Issue with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Issue with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};
