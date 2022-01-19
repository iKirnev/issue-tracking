const sql = require("./db.js");

// constructor
const Issue = function(issue) {
  this.reporter_id = issue.reporter_id,
  this.description = issue.description;
  this.status_id = issue.status_id;
  this.file_src = issue.file_src;
};

Issue.create = (newIssue, result) => {
  sql.query("INSERT INTO issues SET ?", newIssue, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created issue: ", { id: res.insertId, ...newIssue });
    result(null, { id: res.insertId, ...newIssue });
  });
};

Issue.getLast = (query, result) => {
  let where = 'WHERE 1=1';
  let params = [];
  if (query.name) { where += ' AND name LIKE ? '; params.push(`%${ query.name }%`); };
  if (query.description) { where += ' AND description LIKE ? '; params.push(`%${ query.description }%`); };
  if (query.status) { where += ' AND title LIKE ? '; params.push(`%${ query.status }%`); };

  let q = `
      SELECT i.*, r.name, s.title AS status FROM issues i
      INNER JOIN reporters r ON r.id = i.reporter_id
      INNER JOIN statuses s ON s.id = i.status_id
      ${where}
      ORDER BY i.creation_date DESC
      LIMIT 25
  `;
  
  sql.query(q, params, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};


Issue.updateById = (id, issue, result) => {
  sql.query(
    "UPDATE issues SET reporter_id = ?, description = ?, status_id = ? WHERE id = ?",
    [issue.reporter_id, issue.description, issue.status_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Issue with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated issue: ", { id: id, ...issue });
      result(null, { id: id, ...issue });
    }
  );
};

module.exports = Issue;
