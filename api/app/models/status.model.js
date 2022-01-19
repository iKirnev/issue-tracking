const sql = require("./db.js");

// constructor
const Status = function(status) {
  this.title = status.title;
};


Status.getAll = (result) => {
  let query = ` SELECT * FROM statuses`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Status;
