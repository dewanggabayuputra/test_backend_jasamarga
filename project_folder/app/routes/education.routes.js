module.exports = app => {
  const education = require("../controllers/education.controller.js");

  var router = require("express").Router();

  // Create a new Education
  router.post("/", education.create);

  // Retrieve all Employee
  router.get("/", education.findAll);

  // Retrieve a single Education with id
  router.get("/:id", education.findOne);

  // Update a Education with id
  router.put("/:id", education.update);

  // Delete a Education with id
  router.delete("/:id", education.delete);
  

  app.use('/api/education', router);
};