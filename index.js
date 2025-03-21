this is fine Hello Anuj this is my contirubution to the project
mde some change in s march 21 by nishan  this is to bbe checked 
function checkConflict() {
    console.log('By Anuj');
    console.log("hello");
    console.log("new log added by anuj at 14:34");
}

changes made by anuj mar 22 to this file again

const express = require('express');
const connectDB = require('./config/database');
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 6000; // port changed
// these are the change i maade in index js files 
// const Recipes = require('./models/recipes.model.js')

//middleware
app.use(express.json());
app.use(express.static('public'));

const recipeRouter = require("./routes/recipe.route.js");
const userRouter = require("./routes/user.route.js");


app.use("/api/recipes", recipeRouter)
app.use("/api/user", userRouter)


//test
app.get('/', (req, res) => {
    res.send('Hello from Recipe API')
})


//CRUD OPERATION//



//listen
const startserver = async () => {

    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`server is running at port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

startserver();

