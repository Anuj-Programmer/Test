// no we dont need this code i have removed thi sline 

function getLunch() {
    console.log('get the lunch right now ');
    
}

log chgnages made no no need of such 
new changes made 14:09

new changes made at 14:34

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