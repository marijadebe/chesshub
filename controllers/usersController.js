const usersModel = require('../models/usersModel')

var getUsers = async (req,res) => {
    var result = await usersModel.getUsers();
    res.json(result)
}


module.exports = {getUsers};