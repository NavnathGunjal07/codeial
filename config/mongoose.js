const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codieal_devlopment');

const db  = mongoose.connection;

db.on('error',console.error.bind(console,'Error in connecting to MongoDB'));

db.once('open',function(){
console.log('Connected to Databse :: MongoDB');
});

module.exports = db;