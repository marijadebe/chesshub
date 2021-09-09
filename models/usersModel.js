const db = require('./database')

var getUsers = async () => {
    var response = await db.promise().query('SELECT * FROM users')
    var result = Array();
    for(var i = 0; i < response[0].length; i++) {
        result[i] = new Object();
        result[i].id = response[0][i].id;
        result[i].username = response[0][i].username;
    }
    return result;
}

module.exports = {getUsers};