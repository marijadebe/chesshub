var changeEye = (which) => {
    if(which == 1) {
        if($('#f_password').attr('type') == "password") {
            $('#button-addon').html('<i class="fa fa-eye" aria-hidden="true"></i>');
            $('#f_password').prop("type","text");
        }else {
            $('#button-addon').html('<i class="fa fa-eye-slash" aria-hidden="true"></i>');
            $('#f_password').prop("type","password");
        }
    }else {
        if($('#f_repeat_password').attr('type') == "password") {
            $('#button-addon-2').html('<i class="fa fa-eye" aria-hidden="true"></i>');
            $('#f_repeat_password').prop("type","text");
        }else {
            $('#button-addon-2').html('<i class="fa fa-eye-slash" aria-hidden="true"></i>');
            $('#f_repeat_password').prop("type","password");
        }
    }
}