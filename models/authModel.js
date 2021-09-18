const db = require('./database')


var postUser = (username,password,email,securitynum) => {
    db.promise().query("INSERT INTO users(username,password,email,securitynumber) VALUES(?,?,?,?)", [username,password,email,securitynum]);
}

module.exports = {postUser}