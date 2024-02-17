const express = require("express");
const pizzaController = require("../controllers/pizzaController");
const router = express.Router();



console.log("Estoy en pizzaRoutes.js - line 6")

router.post("/getAll", pizzaController.getPizzas);
router.post("/createPizza", pizzaController.CreatePizza);

module.exports = router;