const sql = require("./db.js");

// constructor
const Education = function(education) {
  this.employee_id = education.employee_id;
  this.name = education.name;
  this.level = education.level;
  this.description = education.description;
  this.created_by = education.created_by
  this.updated_by = education.updated_by
  this.created_at = education.created_at
  this.updated_at = education.updated_at
};

Education.create = (newEducation, result) => {
  sql.query(`SELECT * FROM employee WHERE id = ${newEducation.employee_id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        if (res.length == 0) {
            result('Data not found', null);
            return;
        }
  })

  sql.query("INSERT INTO education SET ?", newEducation, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created education: ", { id: res.insertId, ...newEducation });
    result(null, { id: res.insertId, ...newEducation });
  });
};

Education.findById = (id, result) => {
  sql.query(`SELECT * FROM education WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found education: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Education with the id
    result({ kind: "not_found" }, null);
  });
};

Education.getAll = (name, result) => {
  let query = "SELECT * FROM education";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("education: ", res);
    result(null, res);
  });
};

Education.updateById = (id, education, result) => {
  sql.query(`SELECT * FROM employee WHERE id = ${education.employee_id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        if (res.length == 0) {
            result('Data not found', null);
            return;
        }
  })

  sql.query(
    "UPDATE education SET employee_id = ?, name = ?, level = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    [education.employee_id, education.name, education.level, education.description, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Education with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated education: ", { id: id, ...education });
      result(null, { id: id, ...education });
    }
  );
};

Education.remove = (id, result) => {
  sql.query("DELETE FROM education WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Education with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted education with id: ", id);
    result(null, res);
  });
};

module.exports = Education;