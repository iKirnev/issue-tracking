const Reporter = require("../models/reporter.model.js");


exports.findAll = (req, res) => {
  Reporter.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving issues."
      });
    else res.send(data);
  });
};