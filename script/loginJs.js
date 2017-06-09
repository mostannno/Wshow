/**
 * Created by yitai on 2017/5/21.
 */
Zepto(function ($) {

    $(".inputBox").on('blur', function () {
        $(".register").unbind('click', registe);
        $(".login").unbind('click', login);
       var t = this.value;
       var szMsg="[ /#%&'\"\\,;:=!^]";
       var error = false;
       for(var i=1;i<szMsg.length+1;i++){
           if(t.indexOf(szMsg.substring(i-1,i))>-1){
               error = true;
               break;
           }
       }
       if(error == true){
           alert(alertStr="请勿包含以下非法字符[#_%&'\",;:=!^]");
           $(".btn").css('background', 'gray');
           $(".register").unbind('click', registe);
           $(".login").unbind('click', login);
       }
       else{
           $(".btn").css('background', 'white');
           $(".register").on('click', registe);
           $(".login").on('click', login);
       }
    });
    

    function registe() {
        if ($('.name')[0].value == null || $('.passWord')[0].value == null) {
            alert("用户名或密码不能为空");
        }
        else {
            var message = $('.name')[0].value + " " + $('.passWord')[0].value;
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                        if(xhr.responseText == "successful"){
                            login();
                        }else{
                            alert("该用户已存在");
                        }
                    } else {
                        alert("Request was unsuccessful : " + xhr.status)
                    }
                }
            };
            xhr.open("post", "http://localhost:8080/wshow/BasicServlet", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send('method=register&user=' + message);
        }
    }

    function login(){
        if ($('.name')[0].value == null || $('.passWord')[0].value == null) {
            alert("用户名或密码不能为空");
        }
        else {
            var message = $('.name')[0].value + " " + $('.passWord')[0].value;
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                        alert(xhr.responseText);
                        var fixedResponse = xhr.responseText.replace(/\\'/g, "'");
                        var shares = JSON.parse(fixedResponse)[0];
                        window.location.href = "index.html?" + shares.writerId;
                    } else {
                        alert("Request was unsuccessful : " + xhr.status)
                    }
                }
            };
            xhr.open("post", "http://localhost:8080/wshow/BasicServlet", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send('method=login&user=' + message);
        }
    }

});