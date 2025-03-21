const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

const regUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const hashedpw = await bcrypt.hash(password, 10);

        const user = new userModel({ username, email, password: hashedpw })
        await user.save();
        res.status(201).json({ success: true, message: "User Resgistered sucessfully" })

    } catch (err) {
        res.status(400).json({ success: false, error: err.message })
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({ success: true, users, totalusers: users.length });
    } catch (err) {
        res.status(401).json({ success: false, error: err.message });
    }
}

module.exports = {regUser, getUsers}