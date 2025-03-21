require('dotenv').config(); 
const express = require("express");
const router = express.Router();

const {regUser, getUsers, loginUser} = require("../controllers/user.controller")
router.post("/register", regUser);
router.get("/register", getUsers)


module.exports = router