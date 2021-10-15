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
        if(req.session.verified == 1) {
            res.render('main.ejs',{username:req.session.username})
        }else {
            res.render('verify.ejs',{username:req.session.username})
        }
    }else {
        res.redirect("/")
    }
}

module.exports = {getApp,getPass,getSignup,getMain}