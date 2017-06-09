/**
 * Created by yitai on 2017/5/17.
 */
Zepto(function ($) {
    (function () {
    	var goodId;             //点过赞的分享
        var comentGoodId = "";       //点过赞的评论
        var message = location.search.slice(1);
        var showId, writerId, writerName, writerSrc,concernId;
        var messageArray = message.split("|");
        writerId = messageArray[1];
        message = messageArray[0] + "&writerId="+ writerId;
        writerName = messageArray[2];
       /* var a = new Share(12, 13, "abb", "images/class1.jpg", 123, 534, 34, 13, "i like this", "images/class3.jpg", "5-20", "life man", "baidu.com");
        a.toIndexHtml();*/
        var xhrNewId = new XMLHttpRequest();
        xhrNewId.onreadystatechange = function () {
            if(xhrNewId.readyState == 4){
                if((xhrNewId.status >= 200 && xhrNewId.status < 300) || xhrNewId.status == 304){
                    var fixedResponse = xhrNewId.responseText.replace(/\\'/g, "'");
                    var writer = JSON.parse(fixedResponse)[0];
                    concernId = writer.concern;
                    goodId = writer.upvoteShowId.split(" ");
                    console.log(writer.upvoteComentId);
                    comentGoodId = writer.upvoteComentId.split(" ");
                    console.log(comentGoodId);
                    writerSrc = writer.writerSrc;
                }else{
                    alert("Request was unsuccessful : " + xhrNewId.status)
                }
            }
        };
        xhrNewId.open("post", "http://localhost:8080/wshow/BasicServlet", false);
        xhrNewId.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhrNewId.send('method=queryUserByWriterId&writerId='+ writerId);    //请求goodId和writerId
        
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if(xhr.readyState == 4){
                if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                    var fixedResponse = xhr.responseText.replace(/\\'/g, "'");
                    var shares = JSON.parse(fixedResponse)[0];
                    showId = shares.showId;
                    $('.showBox')[0].innerHTML = " ";
                    var sharing = new Share(shares.showId, shares.writerId, shares.writerName, shares.writerSrc, shares.info
                        , shares.goodNum, shares.viewNum, shares.comentNum, shares.comentId, shares.content, shares.images, shares.create_time, shares.label, shares.comdSrc, goodId, concernId);
                    sharing.toIndexHtml();
                    $(".goodBox").on('click', function (e) {
                    	var that = this;
                        e.stopPropagation();
                        var message = "writerId="+writerId+"&showId="+this.dataset.shareid;
                        var xhrGood = new XMLHttpRequest();
                        xhrGood.onreadystatechange = function () {
                            if(xhrGood.readyState == 4){
                                if((xhrGood.status >= 200 && xhrGood.status < 300) || xhrGood.status == 304){
                                	if(xhrGood.responseText == "true"){
                                        that.childNodes[0].src =  "images/goodTrue.svg";
                                        that.childNodes[1].innerText = parseInt(that.childNodes[1].innerText) + 1;
                                    }else{
                                        that.childNodes[0].src =  "images/good.svg";
                                        that.childNodes[1].innerText = parseInt(that.childNodes[1].innerText) - 1;
                                    }
                                }else{
                                    alert("Request was unsuccessful : " + xhrGood.status)
                                }
                            }
                        };
                        console.log(message);
                        xhrGood.open("post", "http://localhost:8080/wshow/BasicServlet", true);
                        xhrGood.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        xhrGood.send('method=upvote&'+ message);
                    });     //点赞
                }else{
                    alert("Request was unsuccessful : " + xhr.status)
                }
            }
        };
        xhr.open("post", "http://localhost:8080/wshow/BasicServlet", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        console.log(message);
        xhr.send('method=queryUserShowByShowId&showId='+ message);  //请求分享


        /*var b = new Coment(1, "aa", "images/Wang.JPG", 3, 3, 12, "- -");
        b.toShare();*/
        setTimeout(function(){
            var xhrComent = new XMLHttpRequest();
            xhrComent.onreadystatechange = function () {
                if (xhrComent.readyState == 4) {
                    if ((xhrComent.status >= 200 && xhrComent.status < 300) || xhrComent.status == 304) {
                        var fixedResponse2 = xhrComent.responseText.replace(/\\'/g, "'");
                        var coments = JSON.parse(fixedResponse2);
                        //$('.commentBox')[0].innerHTML = " ";
                        for(var i=0;i<coments.length;i++){
                        	console.log(comentGoodId);
                            var coment = new Coment(coments[i].writerId, coments[i].writerName, coments[i].writerSrc, coments[i].shareId, coments[i].comentId, coments[i].goodNum, coments[i].content, coments[i].create_time, comentGoodId);
                            coment.toShare();
                            $(".numBoxInC").on('click', goodComent);
                        }
                    } else {
                        alert("Request was unsuccessful : " + xhrComent.status)
                    }
                }
            };

            xhrComent.open("post", "http://localhost:8080/wshow/BasicServlet", true);
            xhrComent.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhrComent.send('method=queryComentsByShowId&showId=' + showId);
        },100);             //请求评论
        var addDiv = $(".addComent");
        var addText = $(".add");
        var btn = $(".btn-default");
        $(".addComent").on('click', function (e) {
            addDiv.css('height',100);
            addText.css('height', 60);
            btn[0].style.display = "inline-block";
            e.stopPropagation();
        });

        $(document).on('click', function () {
            addDiv.css('height',40);
            addText.css('height', 27);
            btn[0].style.display = "none";
        });

        btn.on('click', function (e) {
            addDiv.css('height',40);
            alert("done");
            addText.css('height', 27);
            btn[0].style.display = "none";
            e.stopPropagation();
            var Newmessage = "";
            console.log(writerSrc);
            Newmessage += "showId="+ showId+"&writerId=" +writerId+ "&writerName=" +writerName+ "&writerSrc=" +writerSrc+"&content=" +$('.add')[0].value;
            var xhrNewComent = new XMLHttpRequest();
            xhrNewComent.onreadystatechange = function () {
                if (xhrNewComent.readyState == 4) {
                    if ((xhrNewComent.status >= 200 && xhrNewComent.status < 300) || xhrNewComent.status == 304) {
                        var fixedResponse3 = xhrNewComent.responseText.replace(/\\'/g, "'");
                        console.log("fix3 : " + fixedResponse3);
                        var coments = JSON.parse(fixedResponse3);
                        $('.commentBox')[0].innerHTML = " ";
                        for(var i=0;i<coments.length;i++){
                            var coment = new Coment(coments[i].writerId, coments[i].writerName, coments[i].writerSrc, coments[i].shareId, coments[i].comentId, coments[i].goodNum, coments[i].content, coments[i].create_time, comentGoodId);
                            coment.toShare();
                            window.location.reload();
                        }
                        $(".numBoxInC").on('click', goodComent);
                    } else {
                        alert("Request was unsuccessful : " + xhrNewComent.status)
                    }
                }
            };

            xhrNewComent.open("post", "http://localhost:8080/wshow/BasicServlet", true);
            xhrNewComent.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhrNewComent.send('method=addComent&' + Newmessage);
        });

        $(".returnBox").on('click', function () {
            window.location.href = "index.html?" + writerId;
        });

        function goodComent(e) {
        	console.log(this.childNodes[0])
            var that = this;
            e.stopPropagation();
            var message = "writerId="+writerId+"&comentId="+this.dataset.comentid;
            var xhrGood = new XMLHttpRequest();
            xhrGood.onreadystatechange = function () {
                if(xhrGood.readyState == 4){
                    if((xhrGood.status >= 200 && xhrGood.status < 300) || xhrGood.status == 304){
                    	console.log(xhrGood.responseText);
                        if(xhrGood.responseText == "true"){
                            that.childNodes[0].src =  "images/goodTrue.svg";
                            that.childNodes[1].innerText = parseInt(that.childNodes[1].innerText) + 1;
                        }else{
                            that.childNodes[0].src =  "images/good.svg";
                            that.childNodes[1].innerText = parseInt(that.childNodes[1].innerText) - 1;
                        }
                    }else{
                        alert("Request was unsuccessful : " + xhrGood.status)
                    }
                }
            };
            console.log(message);
            xhrGood.open("post", "http://localhost:8080/wshow/BasicServlet", true);
            xhrGood.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhrGood.send('method=comentUpvote&'+ message);
        }     //点赞
    }());
    
});