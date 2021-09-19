import User from './user.js';

var loginAccount = async (email,password) => {
    var user = new User(undefined,email,password);
    var response = await putData(user);
    if(response.success == "success") {
        window.location.replace("/main");
    }
}

var putData = async (user) => {
    var res;
    await fetch('/auth/log', {
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

export default loginAccount;