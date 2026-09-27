const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/scatch')
.then(function(){
    console.log("Connected to MongoDB");
})
.catch(function(err){
    console.error( err);
});

module.exports = mongoose.connection;

