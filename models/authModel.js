const db = require('./database')


var postUser = (username,password,email,securitynum) => {
    db.promise().query("INSERT INTO users(username,password,email,securitynumber) VALUES(?,?,?,?)", [username,password,email,securitynum]);
}

var getUser = async (email) => {
    var result = await db.promise().query("SELECT * FROM users WHERE email = ? LIMIT 1",[email]);
    var obj = new Object();
    obj.password = result[0][0].password;
    obj.username = result[0][0].username;
    obj.validated = result[0][0].validated;
    return obj;
}

module.exports = {postUser,getUser}