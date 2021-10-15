import User from "./user.js";

var createAccount = async (username,email,password,repeatpassword) => {
    if(password == repeatpassword) {
        var user = new User(username,email,password);
        var response = await putData(user);
        switch(response.error) {
            case "invalid email":
                $('#d_email').append("<div class='invalid-feedback'>Invalid email address entered.</div>");
                //$('.needs-validation').addClass("was-validated");
                $('#f_email').addClass('is-invalid');
                break;
            case "invalid username":
                $('#d_username').append("<div class='invalid-feedback'>Invalid username entered.</div>");
                //$('.needs-validation').addClass("was-validated");
                $('#f_username').addClass("is-invalid");
                break;
            case "exists":
                $('#d_email').append("<div class='invalid-feedback'>User with this email address and/or username already exists.</div>");
                $('#f_email').addClass('is-invalid');
                //$('.needs-validation').addClass("was-validated");
        }
        if(response.success == "success") {
            $('.needs-validation').addClass("was-validated");
            window.location.replace("/main");
        } 
    }else {
        $('#d_password').append("<div class='invalid-feedback'>Passwords do not match.</div>");
        //$('.needs-validation').addClass("was-validated");
        $('#f_password').addClass('is-invalid');
        $('#f_repeat_password').addClass('is-invalid');
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