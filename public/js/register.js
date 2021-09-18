import User from "./user.js";

var createAccount = async (username,email,password,repeatpassword) => {
    if(password == repeatpassword) {
        var user = new User(username,email,password);
        var response = await putData(user);
        switch(response.error) {
            case "invalid email":
                $('#d_email').append("<div class='invalid-feedback'>Invalid email address entered.</div>");
                $('.needs-validation').addClass("was-validated");
                break;
            case "invalid username":
                $('#d_username').append("<div class='invalid-feedback'>Invalid username entered.</div>");
                $('.needs-validation').addClass("was-validated");
                break;
        }
    }else {
        $('#d_password').append("<div class='invalid-feedback'>Passwords do not match.</div>");
        $('.needs-validation').addClass("was-validated");
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