module.exports = app => {
  const employee_family = require("../controllers/employee_family.controller.js");

  var router = require("express").Router();

  // Create a new Employee Profile
  router.post("/", employee_family.create);

  // Retrieve all Employee
  router.get("/", employee_family.findAll);

  // Retrieve a single Employee Profile with id
  router.get("/:id", employee_family.findOne);

  // Update a Employee Profile with id
  router.put("/:id", employee_family.update);

  // Delete a Employee Profile with id
  router.delete("/:id", employee_family.delete);
  

  app.use('/api/employee_family', router);
};