// 
const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(function () {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(function (err) {
    console.error('MongoDB connection error:', err.message);
  });

module.exports = mongoose.connection;
