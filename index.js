const express = require('express');
const port = 8000
const app = express();


app.listen(port,function(err){
    if(err){
        console.log(`Error in running server on port : ${err.message}`);
    }
 
    console.log(`Server running on port : ${port}`);

});