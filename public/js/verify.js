
var verifyAccount = async (code) => {
    var result = await putData(code);
    if(result.success == "success") {
        window.location.replace("/main");
    }
}

var putData = async (code) => {
    var res;
    console.log(code);
    await fetch('/auth/val', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({vercode:code})
    }).then(
        response => response.json().then(data => {
            res = data;
        })
    );
    return res;
}

export default verifyAccount;