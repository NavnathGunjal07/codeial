module.exports.home = function(req, res){
    console.log(req.cookies);
    // res.cookie('something',25);
    return res.render('home.ejs',{
        title: 'Codeial | Home'
    });
}