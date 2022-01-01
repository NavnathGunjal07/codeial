const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');



app.use(express.static('./assets'));
//using layouts from views 
app.use(expressLayouts);
//extract style and css in sub pages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router
app.use('/',require('./routes'));


// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');









app.listen(port,(err)=>{ 
    if(err){
        console.log(`Error in running server: ${err}`);
    }
    console.log(`Server is running on port ${port}`);
});
