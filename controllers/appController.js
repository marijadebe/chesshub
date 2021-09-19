var getApp = (req,res) => {
    if(req.session.login) {
        res.redirect("/main")
    }else {
        res.render('index.ejs')
    }
}
var getPass = (req,res) => {
    if(req.session.login) {
        res.redirect("/main")
    }else {
        res.render('reset.ejs')
    }
}
var getSignup = (req,res) => {
    if(req.session.login) {
        res.redirect("/main")
    }else {
        res.render('signup.ejs')
    }
}
var getMain = (req,res) => {
    if(req.session.login) {
        res.render('main.ejs',{username:req.session.username})
    }else {
        res.redirect("/")
    }
}

module.exports = {getApp,getPass,getSignup,getMain}