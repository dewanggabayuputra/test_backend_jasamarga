const sql = require("./db.js");

// constructor
const EmployeeFamily = function(employee_family) {
    this.employee_id = employee_family.employee_id;
    this.name = employee_family.name;
    this.identifier = employee_family.identifier;
    this.job = employee_family.job;
    this.place_of_birth = employee_family.place_of_birth;
    this.date_of_birth = employee_family.date_of_birth;
    this.religion = employee_family.religion;
    this.is_life = employee_family.is_life;
    this.is_divorced = employee_family.is_divorced;
    this.relation_status = employee_family.relation_status;
    this.created_by = employee_family.created_by
    this.updated_by = employee_family.updated_by
    this.created_at = employee_family.created_at
};

EmployeeFamily.create = (newEmployeeFamily, result) => {
    sql.query(`SELECT * FROM employee WHERE id = ${newEmployeeFamily.employee_id}`, (err, res) => {
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

    sql.query("INSERT INTO employee_family SET ?", newEmployeeFamily, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
        }

        console.log("created employee_family: ", { id: res.insertId, ...newEmployeeFamily });
        result(null, { id: res.insertId, ...newEmployeeFamily });
    });
};

EmployeeFamily.findById = (id, result) => {
  sql.query(`SELECT * FROM employee_family WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found employee_family: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Employee Family with the id
    result({ kind: "not_found" }, null);
  });
};

EmployeeFamily.getAll = (name, result) => {
  let query = "SELECT * FROM employee_family";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("employee_family: ", res);
    result(null, res);
  });
};

EmployeeFamily.updateById = (id, employee_family, result) => {
    sql.query(`SELECT * FROM employee WHERE id = ${employee_family.employee_id}`, (err, res) => {
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
        "UPDATE employee_family SET employee_id = ?, name = ?, identifier = ?, job = ?, place_of_birth = ?, date_of_birth = ?, religion = ?, is_life = ?, is_divorced = ?, relation_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [employee_family.employee_id, employee_family.name, employee_family.identifier, employee_family.job, employee_family.place_of_birth, employee_family.date_of_birth, employee_family.religion, employee_family.is_life, employee_family.is_divorced, employee_family.relation_status, id],
        (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Employee Family with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated employee_family: ", { id: id, ...employee_family });
        result(null, { id: id, ...employee_family });
        }
    );
};

EmployeeFamily.remove = (id, result) => {
  sql.query("DELETE FROM employee_family WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Employee Family with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted employee_family with id: ", id);
    result(null, res);
  });
};

module.exports = EmployeeFamily;