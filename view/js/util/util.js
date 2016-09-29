function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getAuthorization(user){
    return 'Basic ' + btoa(user.mail + ':' + user.pass);
}

function decodeAuthorization(auth){
    var ascii = atob(auth.substr('Basic '.length));
    var index = ascii.indexOf(':');
    return {mail: ascii.substr(0,index) ,pass: ascii.substr(index+1)};
}
