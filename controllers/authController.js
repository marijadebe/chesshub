const nodemailer = require('nodemailer')
const crypto = require('crypto')
const validator = require('email-validator')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
});

var postReg = (req,res) => {
    var regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    console.log(req.body);
    if(!validator.validate(req.body.email)) {
      res.status(418).send({error:"invalid email"})
    }
    if(req.body.username.length > 25 || regex.test(req.body.username)) {
      res.status(418).send({error:"invalid username"})
    }

    var username = req.body.username;
    var password = crypto.createHash('sha256').update(req.body.password).digest('hex');
}
var postLog = (req,res) => {

}

module.exports = {postReg,postLog}