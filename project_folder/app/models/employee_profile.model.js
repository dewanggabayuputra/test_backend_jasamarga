const sql = require("./db.js");

// constructor
const EmployeeProfile = function(employee_profile) {
  this.employee_id = employee_profile.employee_id;
  this.place_of_birth = employee_profile.place_of_birth;
  this.date_of_birth = employee_profile.date_of_birth;
  this.gender = employee_profile.gender;
  this.is_married = employee_profile.is_married;
  this.prof_pict = employee_profile.prof_pict;
  this.created_by = employee_profile.created_by
  this.updated_by = employee_profile.updated_by
  this.created_at = employee_profile.created_at
  this.updated_at = employee_profile.updated_at
};

EmployeeProfile.create = (newEmployeeProfile, result) => {
  sql.query("INSERT INTO employee_profile SET ?", newEmployeeProfile, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created employee_profile: ", { id: res.insertId, ...newEmployeeProfile });
    result(null, { id: res.insertId, ...newEmployeeProfile });
  });
};

EmployeeProfile.findById = (id, result) => {
  sql.query(`SELECT * FROM employee_profile WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found employee_profile: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Employee Profile with the id
    result({ kind: "not_found" }, null);
  });
};

EmployeeProfile.getAll = (name, result) => {
  let query = "SELECT * FROM employee_profile";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("employee_profile: ", res);
    result(null, res);
  });
};

EmployeeProfile.updateById = (id, employee_profile, result) => {
  sql.query(
    "UPDATE employee_profile SET employee_id = ?, place_of_birth = ?, date_of_birth = ?, gender = ?, is_married = ?, prof_pict = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    [employee_profile.employee_id, employee_profile.place_of_birth, employee_profile.date_of_birth, employee_profile.gender, employee_profile.is_married, employee_profile.prof_pict, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Employee Profile with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated employee_profile: ", { id: id, ...employee_profile });
      result(null, { id: id, ...employee_profile });
    }
  );
};

EmployeeProfile.remove = (id, result) => {
  sql.query("DELETE FROM employee_profile WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Employee Profile with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted employee_profile with id: ", id);
    result(null, res);
  });
};

module.exports = EmployeeProfile;