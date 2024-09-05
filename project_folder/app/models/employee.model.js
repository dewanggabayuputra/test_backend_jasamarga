const sql = require("./db.js");

// constructor
const Employee = function(employee) {
  this.nik = employee.nik;
  this.name = employee.name;
  this.is_active = employee.is_active;
  this.start_date = employee.start_date;
  this.end_date = employee.end_date;
  this.created_by = employee.created_by
  this.updated_by = employee.updated_by
  this.created_at = employee.created_at
  this.updated_at = employee.updated_at
};

Employee.create = (newEmployee, result) => {
  sql.query("INSERT INTO employee SET ?", newEmployee, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created employee: ", { id: res.insertId, ...newEmployee });
    result(null, { id: res.insertId, ...newEmployee });
  });
};

Employee.findById = (id, result) => {
  sql.query(`SELECT a.*, b.*, c.*, d.* FROM employee a left join employee_profile b on a.id = b.employee_id left join employee_family c on a.id = c.employee_id left join education d on a.id = d.employee_id WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found employee: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Employee with the id
    result({ kind: "not_found" }, null);
  });
};

Employee.getAll = (name, result) => {
  let query = "SELECT a.* FROM employee a";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("employee: ", res);
    result(null, res);
  });
};

Employee.updateById = (id, employee, result) => {
  sql.query(
    "UPDATE employee SET name = ?, is_active = ?, start_date = ?, end_date = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    [employee.name, employee.is_active, employee.start_date, employee.end_date, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Employee with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated employee: ", { id: id, ...employee });
      result(null, { id: id, ...employee });
    }
  );
};

Employee.remove = (id, result) => {
  sql.query("DELETE FROM employee WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Employee with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted employee with id: ", id);
    result(null, res);
  });
};


Employee.getReport = (result) => {
  let query = `SELECT 
    a.id AS employee_id, 
    a.nik, 
    a.name as employee_name,
    a.is_active, 
    b.gender, 
    TIMESTAMPDIFF(YEAR, b.date_of_birth, CURDATE()) AS age, 
    c.name, 
    c.level,
    CONCAT(
        IF(COUNT(DISTINCT CASE WHEN d.relation_status = 'Suami' THEN d.id END) > 0, 
           CONCAT(COUNT(DISTINCT CASE WHEN d.relation_status = 'Suami' THEN d.id END), ' Suami '), ''),
        IF(COUNT(DISTINCT CASE WHEN d.relation_status = 'Istri' THEN d.id END) > 0, 
           CONCAT(COUNT(DISTINCT CASE WHEN d.relation_status = 'Istri' THEN d.id END), ' Istri '), ''),
        IF(COUNT(DISTINCT CASE WHEN d.relation_status = 'Anak' THEN d.id END) > 0, 
           CONCAT(COUNT(DISTINCT CASE WHEN d.relation_status = 'Anak' THEN d.id END), ' Anak '), ''),
        IF(COUNT(DISTINCT CASE WHEN d.relation_status = 'Anak Sambung' THEN d.id END) > 0, 
           CONCAT(COUNT(DISTINCT CASE WHEN d.relation_status = 'Anak Sambung' THEN d.id END), ' Anak Sambung '), '')
    ) AS family_data  
FROM 
    employee a 
    LEFT JOIN employee_profile b ON a.id = b.employee_id 
    LEFT JOIN employee_family d ON a.id = d.employee_id
    LEFT JOIN (
        SELECT 
            e1.employee_id,
            e1.name,
            e1.level
        FROM 
            education e1
        INNER JOIN (
            SELECT 
                employee_id, 
                MAX(id) AS last_education_id
            FROM 
                education
            GROUP BY 
                employee_id
        ) e2 ON e1.employee_id = e2.employee_id AND e1.id = e2.last_education_id
    ) c ON a.id = c.employee_id
    
GROUP BY 
    a.id, a.nik, a.name, a.is_active, b.gender, b.date_of_birth, c.name, c.level`;
  
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    let data = res
    function bufferToString(bufferData) {
      return Buffer.from(bufferData).toString('utf-8');
    }

    // Decode family_data for each employee
    data.forEach(employee => {
      console.log('loop ', employee.family_data.type)
        employee.family_data = bufferToString(employee.family_data);
    });

    console.log("employee: ", data);
    result(null, data);
  });
};

module.exports = Employee;