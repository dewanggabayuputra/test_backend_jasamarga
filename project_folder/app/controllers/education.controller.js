const Education = require("../models/employee_family.model.js");
var validator = require('validator');

// Create and Save a new Education
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const currenttime = new Date();
  // Create a Education
  const education = new Education({
    employee_id: req.body.employee_id,
    name: req.body.name,
    name: req.body.name,
    level: req.body.level,
    description: req.body.description,
    created_by: req.body.created_by,
    updated_by: req.body.updated_by,
    created_at: currenttime,
    updated_at: currenttime
  });

  const errors = [];

  if (validator.isEmpty(education.employee_id)) {
    errors.push('employee_id must be filled');
  }
  
  if (!validator.isInt(education.employee_id, {max : 11} )) {
    errors.push('employee_id must be contain number and 11 numbers long');
  }

  if (validator.isEmpty(education.description)) {
    errors.push('description must be filled');
  }

  if (validator.isEmpty(education.created_by)) {
    errors.push('created_by must be filled');
  }

  if (validator.isEmpty(education.updated_by)) {
    errors.push('updated_by must be filled');
  }


  console.log('errors', errors)
  // return
  // Return errors if any
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Save Education in the database
  Education.create(education, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Education."
      });
    else res.send(data);
  });
};

// Retrieve all Education from the database (with condition).
exports.findAll = (req, res) => {
  const name = req.query.name;

  Education.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Find a single Education with a id
exports.findOne = (req, res) => {
  Education.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Education with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Education with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};


// Update a Education identified by the id in the request
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
  
  if (!validator.isInt(req.body.employee_id, {max : 11} )) {
    errors.push('employee_id must be contain number and 11 numbers long');
  }

  if (validator.isEmpty(req.body.description)) {
    errors.push('description must be filled');
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

  Education.updateById(
    req.params.id,
    new Education(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Education with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Education with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Education with the specified id in the request
exports.delete = (req, res) => {
  Education.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Education with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Education with id " + req.params.id
        });
      }
    } else res.send({ message: `Education was deleted successfully!` });
  });
};
