const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local_stratergy');







//url encoded
app.use(express.urlencoded());

//use cookie parser
app.use(cookieParser());


app.use(express.static('./assets'));
//using layouts from views 
app.use(expressLayouts);
//extract style and css in sub pages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);




// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');


app.use(session({
    name:'Codeial',
    //todo change secret before deployment in production mode
    secret:'secretecode',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }


}));


///Using passport
app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser);

//use express router
app.use('/',require('./routes'));







app.listen(port,(err)=>{ 
    if(err){
        console.log(`Error in running server: ${err}`);
    }
    console.log(`Server is running on port ${port}`);
});
