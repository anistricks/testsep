var express = require("express");
const { Propositions } = require("../model/propositions");


var router = express.Router();
const propositionModel = new Propositions();

// GET /pizzas : read all the pizzas from the menu
router.get("/", function (req, res) {
  console.log("GET /propositions");
  return res.json(propositionModel.getAll());
});

// GET /pizzas/{id} : Get a pizza from its id in the menu
router.get("/:id", function (req, res) {
  console.log(`GET /propositions/${req.params.id}`);

  const proposition = propositionModel.getOne(req.params.id);
  // Send an error code '404 Not Found' if the pizza was not found
  if (!proposition) return res.status(404).end();

  return res.json(proposition);
});

// POST /pizzas : create a pizza to be added to the menu.
// This shall be authorized only to admin user which possesses a valid JWT
// authorize Middleware : it authorize any authenticated user and load the user in req.user
router.post("/", function (req, res) {
  console.log("POST /propositions");

  // Send an error code '400 Bad request' if the body parameters are not valid
  if (
    !req.body ||
    (req.body.hasOwnProperty("proposal") && req.body.proposal.length === 0) ||
    (req.body.hasOwnProperty("status") && req.body.status.length === 0)
  )
    return res.status(400).end();
  

  const proposition = propositionModel.addOne(req.body);

  return res.json(proposition);
});

// DELETE /pizzas/{i} : delete a pizza from the menu
// This shall be authorized only to admin user which possesses a valid JWT
// authorize Middleware : it authorize any authenticated user and load the user in req.user
router.delete("/:id", function (req, res) {
  console.log(`DELETE /propositions/${req.params.id}`);

  

  const proposition = propositionModel.deleteOne(req.params.id);
  // Send an error code '404 Not Found' if the pizza was not found
  if (!proposition) return res.status(404).end();
  return res.json(proposition);
});

// PUT /pizzas/{id} : update a pizza at id
// This shall be authorized only to admin user which possesses a valid JWT
router.put("/:id", function (req, res) {
  console.log(`PUT /propositions/${req.params.id}`);
  // Send an error code '400 Bad request' if the body parameters are not valid
  if (
    !req.body ||
    (req.body.hasOwnProperty("proposal") && req.body.proposal.length === 0) ||
    (req.body.hasOwnProperty("status") && req.body.status.length === 0)
  )
    return res.status(400).end();

  

  const proposition = propositionModel.updateOne(req.params.id, req.body);
  // Send an error code 'Not Found' if the pizza was not found :
  if (!proposition) return res.status(404).end();
  return res.json(proposition);
});

module.exports = router;
