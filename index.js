const express = require('express');
const port = 8000
const app = express();

// app using routes adding path.
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`Error in running server on port : ${err}`);
        return;
    }
 
    console.log(`Server running on port : ${port}`);

});