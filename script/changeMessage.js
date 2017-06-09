/**
 * Created by yitai on 2017/5/22.
 */
Zepto(function ($) {
    (function () {
        var message = location.search.slice(1);
        var xhrId = new XMLHttpRequest();
        var Owriter;
        var base ;
         xhrId.onreadystatechange = function () {
            if(xhrId.readyState == 4){
                if((xhrId.status >= 200 && xhrId.status < 300) || xhrId.status == 304){
                    var fixedResponse = xhrId.responseText.replace(/\\'/g, "'");
                    var writer = JSON.parse(fixedResponse)[0];
                    Owriter = new Writer(writer.writerId, writer.writerName, writer.writerSrc, writer.upvoteShowId, writer.colShowId, writer.viewShowId, writer.info, writer.fans, writer.concern, writer.myShow, writer.password);
                    $(".upImg")[0].src = Owriter.writerSrc;
                    base = Owriter.writerSrc;
                }else{
                    alert("Request was unsuccessful : " + xhrId.status)
                }
            }
        };
        xhrId.open("post", "http://localhost:8080/wshow/BasicServlet", true);
        xhrId.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhrId.send('method=queryUserByWriterId&writerId='+ message);

        $('#file').on('change', function () {
            console.log(this.files[0]);
            lrz(this.files[0])
                .then(function (rst) {
                    console.log(rst);
                    $(".upImg")[0].src = rst.base64;
                    base = rst.base64;
                    console.log(base);
                })
                .always(function () {
                    // 不管是成功失败，都会执行
                });
        });         //上传图片

        $(".btn-group").on('click', function () {
            var password = $(".password")[0].value;
            var newPassword = $(".newPassword")[0].value;
            var info = $(".personal")[0].value;
            if(password != newPassword){
                alert("两次输入的密码不一致");
            }else {
                if (password == "" && newPassword == "") {
                    password = Owriter.passWord;
                }
                if(info == ""){info = Owriter.info}
                var message = "writerId=" + Owriter.writerId + "&writerSrc=" + base + "&info=" + info + "&password=" + password;
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                            console.log(xhr.responseText);
                            window.location.href = "index.html?" + Owriter.writerId;
                        } else {
                            alert("Request was unsuccessful : " + xhr.status)
                        }
                    }
                };
                xhr.open("post", "http://localhost:8080/wshow/BasicServlet", true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send('method=updateUser&' + message);
            }
        });
    }());

});
