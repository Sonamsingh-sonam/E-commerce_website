const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/scatch');

const userSchema = new mongoose.Schema({

    fullName: String,
    email: String,
    password: String,
    cart:{
        type: Array,
        default: [],
        
    },
    isadmin:Boolean,
    orders:{
        type: Array,
        default: [],
    },
    contact: Number,
    picture: String,
});

module.exports = mongoose.model('User', userSchema);