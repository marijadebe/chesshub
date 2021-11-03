const nodemailer = require('nodemailer')
const crypto = require('crypto')
const validator = require('email-validator')
const authModel = require('../models/authModel')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
});

var postReg = async (req,res) => {
    var regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    var resource = await authModel.getUser(req.body.email, req.body.username);
    if(resource.error) {
      res.status(418).send({error:"exists"})
    }
    else if(!validator.validate(req.body.email)) {
      res.status(418).send({error:"invalid email"})
    }
    else if(req.body.username.length > 25 || regex.test(req.body.username) || req.body.username.length < 3) {
      res.status(418).send({error:"invalid username"})
    }else {
      var email = req.body.email;
      var username = req.body.username;
      var password = crypto.createHash('sha256').update(req.body.password).digest('hex');
      var securitynum = Math.floor(100000 + Math.random() * 900000);
      authModel.postUser(username,password,email,securitynum);
      var mailOptions = {
        from: 'chesslinkservice@gmail.com',
        to: email,
        subject: 'Account Verification',
        html:'<h1>Welcome to Chesslink '+username+'!</h1><br/>Your verification code is '+securitynum+'.<br/>Please remember this code in case you need to reset your password.'
      };
      transporter.sendMail(mailOptions);
      req.session.login = true;
      req.session.username=username;
      req.session.verified = 0;
      res.send({success:"success"})
  }
}

var postLog = async (req,res) => {
    var email = req.body.email;
    var password = crypto.createHash('sha256').update(req.body.password).digest('hex');
    var data = await authModel.loginUser(email,password);
    if(data.success=="success") {
      req.session.login = true;
      req.session.username = data.username;
      req.session.verified = data.verified;
      res.send({success:"success"})
    }else {
      res.status(418).send({error:"error"})
    }
}

var postVerify = async (req,res) => {
  if(req.session.login == true) {
    var data = await authModel.getCode(req.session.username, req.body.vercode);
    if(data.success == "success") {
      req.session.verified = 1;
      authModel.validateUser(req.session.username);
      res.send(data);
    }
  }else {
    res.status(418).send({error:"mustbeloggedin"})
  }
}

module.exports = {postReg,postLog,postVerify}