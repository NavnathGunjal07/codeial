const mongoose = require('mongoose');
const env = require('../config/environment');

mongoose.connect(`mongodb+srv://NavnathGunjal:sidharthgunjal@cluster0.fdrcp.mongodb.net/${env.db}`);

const db  = mongoose.connection;

db.on('error',console.error.bind(console,'Error in connecting to MongoDB'));

db.once('open',function(){
console.log('Connected to Databse :: MongoDB');
});

module.exports = db;