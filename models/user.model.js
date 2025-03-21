// no we dont need this code i have removed thi sline 

log chgnages made no no need of such 

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
})

const user = mongoose.model('user', userSchema)
module.exports = user;