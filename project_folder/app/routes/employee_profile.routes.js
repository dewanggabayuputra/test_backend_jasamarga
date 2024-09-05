module.exports = app => {
  const employee_profile = require("../controllers/employee_profile.controller.js");

  var router = require("express").Router();

  // Create a new Employee Profile
  router.post("/", employee_profile.create);

  // Retrieve all Employee
  router.get("/", employee_profile.findAll);

  // Retrieve a single Employee Profile with id
  router.get("/:id", employee_profile.findOne);

  // Update a Employee Profile with id
  router.put("/:id", employee_profile.update);

  // Delete a Employee Profile with id
  router.delete("/:id", employee_profile.delete);
  

  app.use('/api/employee_profile', router);
};