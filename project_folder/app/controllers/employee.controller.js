const Employee = require("../models/employee.model.js");
var validator = require('validator');

// Create and Save a new Employee
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const currenttime = new Date();
  // Create a Employee
  const employee = new Employee({
    nik: req.body.nik,
    name: req.body.name,
    is_active: req.body.is_active,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    created_by: req.body.created_by,
    updated_by: req.body.updated_by,
    created_at: currenttime,
    updated_at: currenttime
  });

  const errors = [];

  if (!validator.isLength(employee.nik, { max: 30 })) {
    errors.push('nik must be at least 30 characters long');
  }

  if (!validator.isLength(employee.name, { max: 50 })) {
    errors.push('name must be at least 50 characters long');
  }

  // is active vaidation
  if (validator.isEmpty(employee.is_active)) {
    errors.push('is_active must be filled');
  }

  if (!validator.isBoolean(employee.is_active)) {
    errors.push('is_active must be filled boolean (true or false)');
  }

  if (validator.isEmpty(employee.start_date, { ignore_whitespace: false })) {
    errors.push('start_date must be filled');
  }

  if (validator.isEmpty(employee.end_date, { ignore_whitespace: false })) {
    errors.push('end_date must be filled');
  }

  if (!validator.isLength(employee.created_by, { max: 50 })) {
    errors.push('name must be at least 50 characters long');
  }

  if (!validator.isLength(employee.updated_by, { max: 50 })) {
    errors.push('name must be at least 50 characters long');
  }

  console.log('errors', errors)
  // return
  // Return errors if any
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Save Employee in the database
  Employee.create(employee, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employee."
      });
    else res.send(data);
  });
};

// Retrieve all Employee from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  Employee.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Find a single Employee with a id
exports.findOne = (req, res) => {
  Employee.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Employee with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Employee with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};


// Update a Employee identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const errors = [];

  if (!validator.isLength(req.body.nik, { max: 30 })) {
    errors.push('nik must be at least 30 characters long');
  }

  if (!validator.isLength(req.body.name, { max: 50 })) {
    errors.push('name must be at least 50 characters long');
  }

  // is active vaidation
  if (validator.isEmpty(req.body.is_active)) {
    errors.push('is_active must be filled');
  }

  if (!validator.isBoolean(req.body.is_active)) {
    errors.push('is_active must be filled boolean (true or false)');
  }

  if (validator.isEmpty(req.body.start_date, { ignore_whitespace: false })) {
    errors.push('start_date must be filled');
  }

  if (validator.isEmpty(req.body.end_date, { ignore_whitespace: false })) {
    errors.push('end_date must be filled');
  }

  if (!validator.isLength(req.body.created_by, { max: 50 })) {
    errors.push('name must be at least 50 characters long');
  }

  if (!validator.isLength(req.body.updated_by, { max: 50 })) {
    errors.push('name must be at least 50 characters long');
  }

  console.log('errors', errors)
  // return
  // Return errors if any
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  console.log(req.body);

  Employee.updateById(
    req.params.id,
    new Employee(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Employee with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Employee with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Employee with the specified id in the request
exports.delete = (req, res) => {
  Employee.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Employee with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Employee with id " + req.params.id
        });
      }
    } else res.send({ message: `Employee was deleted successfully!` });
  });
};

// Get Employee Report 
exports.getReport = (req, res) => {
  Employee.getReport((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};
