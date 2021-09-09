var getApp = (req,res) => {
    res.render('index.ejs')
}
var getPass = (req,res) => {
    res.render('reset.ejs')
}
var getSignup = (req,res) => {
    res.render('signup.ejs')
}
var getMain = (req,res) => {
    res.render('main.ejs')
}

module.exports = {getApp,getPass,getSignup,getMain}