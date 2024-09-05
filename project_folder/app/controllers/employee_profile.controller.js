const EmployeeProfile = require("../models/employee_profile.model.js");
var validator = require('validator');

// Create and Save a new EmployeeProfile
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const currenttime = new Date();
  // Create a EmployeeProfile
  const employee_profile = new EmployeeProfile({
    employee_id: req.body.employee_id,
    place_of_birth: req.body.place_of_birth,
    date_of_birth: req.body.date_of_birth,
    gender: req.body.gender,
    is_married: req.body.is_married,
    prof_pict: req.body.prof_pict,
    created_by: req.body.created_by,
    updated_by: req.body.updated_by,
    created_at: currenttime,
    updated_at: currenttime
  });

  const errors = [];

  if (validator.isEmpty(employee_profile.employee_id)) {
    errors.push('employee_id must be filled');
  }

  if (!validator.isLength(employee_profile.employee_id, { max: 11 })) {
    errors.push('employee_id must be at least 11 characters long');
  }
  
  if (!validator.isInt(employee_profile.employee_id, {max : 11} )) {
    errors.push('employee_id must be contain number and 11 numbers long');
  }

  if (validator.isEmpty(employee_profile.gender)) {
    errors.push('gender must be filled');
  }

  const gender = ['Laki-laki', 'Perempuan'];
  if (!gender.includes(employee_profile.gender)) {
    errors.push('relation_status must contain Laki-laki or Perempuan');
  }

  if (validator.isEmpty(employee_profile.is_married)) {
    errors.push('is_married must be filled');
  }

  if (!validator.isBoolean(employee_profile.is_married)) {
    errors.push('is_active must be filled boolean (true or false)');
  }


  console.log('errors', errors)
  // return
  // Return errors if any
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Save EmployeeProfile in the database
  EmployeeProfile.create(employee_profile, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the EmployeeProfile."
      });
    else res.send(data);
  });
};

// Retrieve all EmployeeProfile from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  EmployeeProfile.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Find a single EmployeeProfile with a id
exports.findOne = (req, res) => {
  EmployeeProfile.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found EmployeeProfile with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving EmployeeProfile with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};


// Update a EmployeeProfile identified by the id in the request
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

  if (validator.isEmpty(req.body.gender)) {
    errors.push('gender must be filled');
  }

  const gender = ['Laki-laki', 'Perempuan'];
  if (!gender.includes(req.body.gender)) {
    errors.push('relation_status must contain Laki-laki or Perempuan');
  }

  if (validator.isEmpty(req.body.is_married)) {
    errors.push('is_married must be filled');
  }

  if (!validator.isBoolean(req.body.is_married)) {
    errors.push('is_active must be filled boolean (true or false)');
  }


  console.log('errors', errors)
  // return
  // Return errors if any
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }


  console.log(req.body);

  EmployeeProfile.updateById(
    req.params.id,
    new EmployeeProfile(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found EmployeeProfile with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating EmployeeProfile with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a EmployeeProfile with the specified id in the request
exports.delete = (req, res) => {
  EmployeeProfile.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found EmployeeProfile with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete EmployeeProfile with id " + req.params.id
        });
      }
    } else res.send({ message: `EmployeeProfile was deleted successfully!` });
  });
};
