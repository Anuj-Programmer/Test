const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {type: String,
        required: [true, "Recipe name is required"]
    },
    category: {
        type: String,
        required: [true, "Category is required"]
    },
    ratings: {
        type: Number,
        required: [true, "rating is required"],
        default: 0
    },
    image:{
        type: String
    },
    shortinfo:{
        type: String
    },
    direction:{
        type: String, 
        required: [true, "Direction is Required"]
    },
    ingridients:{
        type: String, 
        required: [true, "Ingridients is Required"]
    },
    time:{
        type: String
    }
},
({timestamps: true})
)

const Recipes = mongoose.model("Recipes", recipeSchema);
module.exports = Recipes;

