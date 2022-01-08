module.exports.home = function(req, res){
    if(!req.isAuthenticated()){
        return res.redirect('/users/sign-in')
    }
    return res.render('home.ejs',{
        title: 'Codeial | Home',
        header:true,
        footer:true
    });
}