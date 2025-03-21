const express = require('express');
const router = express.Router();

const {getRecipe, createRecipe, filterRecipe, deleteRecipeById, updateRecipeById} = require("../controllers/recipe.controller.js");

router.post("/", createRecipe);
router.get("/", getRecipe);
router.get("/search", filterRecipe);
router.put("/:id", updateRecipeById);
router.delete("/:id", deleteRecipeById);

module.exports = router;