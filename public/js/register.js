import User from "./user.js";

var createAccount = async (username,email,password,repeatpassword) => {
    if(password == repeatpassword) {
        var user = new User(username,email,password);
        var response = await putData(user);
        console.log(response);
    }else {
        console.log("passwords must be same");
    }
}

var putData = async (user) => {
    var res;
    await fetch('/auth/reg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(
        response => response.json().then(data => {
            res = data;
        })
    );
    return res;
}

export default createAccount;