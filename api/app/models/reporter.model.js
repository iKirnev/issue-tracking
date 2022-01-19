const sql = require("./db.js");

// constructor
const Reporter = function(reporter) {
  this.name = reporter.name;
};


Reporter.getAll = (result) => {
  let query = ` SELECT * FROM reporters`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Reporter;
