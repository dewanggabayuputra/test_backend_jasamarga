const EmployeeFamily = require("../models/employee_family.model.js");
var validator = require('validator');

// Create and Save a new EmployeeFamily
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const currenttime = new Date();
  // Create a EmployeeFamily
  const employee_family = new EmployeeFamily({
    employee_id: req.body.employee_id,
    name: req.body.name,
    identifier: req.body.identifier,
    job: req.body.job,
    place_of_birth: req.body.place_of_birth,
    date_of_birth: req.body.date_of_birth,
    religion: req.body.religion,
    is_life: req.body.is_life,
    is_divorced: req.body.is_divorced,
    relation_status: req.body.relation_status,
    created_by: req.body.created_by,
    updated_by: req.body.updated_by,
    created_at: currenttime,
    updated_at: currenttime
  });

  const errors = [];
  
  if (validator.isEmpty(employee_family.employee_id)) {
    errors.push('employee_id must be filled');
  }
  
  if (!validator.isLength(employee_family.employee_id, { max: 11 })) {
    errors.push('employee_id must be at least 11 characters long');
  }
  
  if (!validator.isInt(employee_family.employee_id, {max : 11} )) {
    errors.push('employee_id must be contain number and 11 numbers long');
  }

  if (validator.isEmpty(employee_family.religion)) {
    errors.push('religion must be filled');
  }

  const religions = ['Islam','Katolik','Buda','Protestan','Konghucu'];
  if (!religions.includes(employee_family.religion)) {
    errors.push('religion must contain Islam, Katolik, Buda, Protestan, or Konghucu');
  }


  if (validator.isEmpty(employee_family.is_life)) {
    errors.push('is_life must be filled');
  }
  
  if (!validator.isBoolean(employee_family.is_life)) {
    errors.push('is_life must be filled boolean (true or false)');
  }

  if (validator.isEmpty(employee_family.is_divorced)) {
    errors.push('is_divorced must be filled');
  }

  if (!validator.isBoolean(employee_family.is_divorced)) {
    errors.push('is_divorced must be filled boolean (true or false)');
  }

  if (validator.isEmpty(employee_family.relation_status)) {
    errors.push('relation_status must be filled');
  }

  const relation_status = ['Suami', 'Istri', 'Anak', 'Anak Sambung'];
  if (!relation_status.includes(employee_family.relation_status)) {
    errors.push('relation_status must contain Suami, Istri, Anak, or Anak Sambung');
  }

  if (validator.isEmpty(employee_family.created_by)) {
    errors.push('created_by must be filled');
  }

  if (validator.isEmpty(employee_family.updated_by)) {
    errors.push('updated_by must be filled');
  }


  console.log('errors', errors)
  // return
  // Return errors if any
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Save EmployeeFamily in the database
  EmployeeFamily.create(employee_family, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the EmployeeFamily."
      });
    else res.send(data);
  });
};

// Retrieve all EmployeeFamily from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  EmployeeFamily.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Find a single EmployeeFamily with a id
exports.findOne = (req, res) => {
  EmployeeFamily.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found EmployeeFamily with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving EmployeeFamily with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};


// Update a EmployeeFamily identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const errors = [];
  
  if (validator.isEmpty(req.body.employee_id)) {
    errors.push('employee_id must be filled');
  }
  
  if (!validator.isLength(req.body.employee_id, { max: 11 })) {
    errors.push('employee_id must be at least 11 characters long');
  }
  
  if (!validator.isInt(req.body.employee_id, {max : 11} )) {
    errors.push('employee_id must be contain number and 11 numbers long');
  }

  if (validator.isEmpty(req.body.religion)) {
    errors.push('religion must be filled');
  }

  const religions = ['Islam','Katolik','Buda','Protestan','Konghucu'];
  if (!religions.includes(req.body.religion)) {
    errors.push('religion must contain Islam, Katolik, Buda, Protestan, or Konghucu');
  }


  if (validator.isEmpty(req.body.is_life)) {
    errors.push('is_life must be filled');
  }
  
  if (!validator.isBoolean(req.body.is_life)) {
    errors.push('is_life must be filled boolean (true or false)');
  }

  if (validator.isEmpty(req.body.is_divorced)) {
    errors.push('is_divorced must be filled');
  }

  if (!validator.isBoolean(req.body.is_divorced)) {
    errors.push('is_divorced must be filled boolean (true or false)');
  }

  if (validator.isEmpty(req.body.relation_status)) {
    errors.push('relation_status must be filled');
  }

  const relation_status = ['Suami', 'Istri', 'Anak', 'Anak Sambung'];
  if (!relation_status.includes(req.body.relation_status)) {
    errors.push('relation_status must contain Suami, Istri, Anak, or Anak Sambung');
  }

  if (validator.isEmpty(req.body.created_by)) {
    errors.push('created_by must be filled');
  }

  if (validator.isEmpty(req.body.updated_by)) {
    errors.push('updated_by must be filled');
  }


  console.log('errors', errors)
  // return
  // Return errors if any
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  console.log(req.body);

  EmployeeFamily.updateById(
    req.params.id,
    new EmployeeFamily(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found EmployeeFamily with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating EmployeeFamily with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a EmployeeFamily with the specified id in the request
exports.delete = (req, res) => {
  EmployeeFamily.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found EmployeeFamily with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete EmployeeFamily with id " + req.params.id
        });
      }
    } else res.send({ message: `EmployeeFamily was deleted successfully!` });
  });
};
