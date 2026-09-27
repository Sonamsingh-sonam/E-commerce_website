const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/scatch');

const ownerSchema = new mongoose.Schema({

    fullName: String,
    email: String,
    password: String,
    
    products:{
        type: Array,
        default: [],
    },
    picture: String,
    gstin: String,
});

module.exports = mongoose.model('Owner', ownerSchema);