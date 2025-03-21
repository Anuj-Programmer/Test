const recipeModel = require("../models/recipes.model.js")


//get method
const getRecipe = async (req, res) => {
    try {
        const recipes = await recipeModel.find();
        res.status(200).json({ success: true, recipes, TotalRecipes: recipes.length });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

//post method
const createRecipe = async (req, res) => {
    try {
        // capture the payload
        const { title, category, ratings, image, quantity, direction, ingridients, time, shortinfo } = req.body;
        const newRecipe = await recipeModel.create({ title, category, ratings, image, quantity, direction, ingridients,time, shortinfo });
        res.status(201).json({ success: true, message: "New Recipe added", newRecipe });
    } catch (err) {
        res.status(401).json({ success: false, error: err.message });
    }
};

//update method
const updateRecipeById = async (req, res) => {
    try {
        const { id } = req.params;
        const recipes = await recipeModel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
    
        if (!recipes) {
            return res.status(404).json({ success: true, message: "Recipe Not Found" })
        }
        res.status(200).json({ sucess: true, message: "Recipe Data Updated", recipes });
    } catch (error) {
        res.status(500).json({status: false, err: error.message})
    }

}

//delete method
const deleteRecipeById = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await recipeModel.findByIdAndDelete(id);
    
        if (!recipe) {
            return res
            .status(404)
            .json({ success: false, message: "Recipe not found" });
        }
    
        res
        .status(200)
        .json({ success: true, message: "Recipe deleted successfully", recipe }); 
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "An error occurred",
            error: err.message,
          });
    }

}

//filter method
const filterRecipe = async (req, res) => {
    try {
      const title = req.query.title;
      const category = req.query.category;
      let query = {};
  
      if (title) {
        const titlesArray = title.split(","); // Convert to an array
        query.title = { $in: titlesArray };
      }
  
      if (category) {
        query.category = category;
      }
  
      const recipes = await recipeModel.find(query);
  
      if (recipes.length === 0) {
        return res
          .status(200)
          .json({ success: true, message: "No Recipes found for this search criteria" });
      }
  
      res.status(200).json({ success: true, recipes, TotalRecipes: recipes.length });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

  module.exports = {getRecipe, createRecipe, filterRecipe, deleteRecipeById, updateRecipeById};