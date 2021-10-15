const db = require('./database')


var postUser = (username,password,email,securitynum) => {
    db.promise().query("INSERT INTO users(username,password,email,securitynumber) VALUES(?,?,?,?)", [username,password,email,securitynum]);
}

var getUser = async (email,username) => {
    try {
        var result = await db.promise().query("SELECT * FROM users WHERE email = ? OR username = ?",[email,username]);
        if(result[0].length > 0) {
            return {"error":"exists"}
        }
        return {"success":"success"}
    }
    catch(err) {
        return {error:"nothingfound"};
    }
}
var loginUser = async (email,password) => {
    try {
        var result = await db.promise().query("SELECT * FROM users WHERE email=? AND password=?",[email,password])
        if(result[0].length > 0) {
            return {success:"success",username:result[0][0].username,verified:result[0][0].validated}
        }else {
            return {error:"wrong"}
        }
    }catch(err) { 
        return {error:"dberror"}
    }
}

var getCode = async (username, vercode) => {
    try {
        var result = await db.promise().query("SELECT securitynumber FROM users WHERE username=? LIMIT 1",[username])
        if(vercode==result[0][0].securitynumber) {
            return {success:"success"}
        }else {
            return {error:"invalidsecuritynumber"}
        }
    }
    catch(err) {
        return {error:"nothingfound"};
    }
}

var validateUser = username => {
    db.promise().query("UPDATE users SET validated=1 WHERE username=?",[username]);
}

module.exports = {postUser,getUser,getCode,validateUser,loginUser}