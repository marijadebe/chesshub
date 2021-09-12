const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'chesslinkservice@gmail.com',
      pass: 'SLmtlru!O0'
    }
});

var postReg = (req,res) => {
    var username = req.body.username;
    var password = crypto.createHash('sha256').update(req.body.password).digest('hex');
    console.log(passsword)
}
var postLog = (req,res) => {

}

module.exports = {postReg,postLog}