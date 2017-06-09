/**
 * Created by yitai on 2017/5/25.
 */
Zepto(function ($) {
    var message = location.search.slice(1);
    console.log(message);
    var messageArray = message.split("|");
    var writerId = messageArray[0];
    var title = messageArray[1];
    var goodId = messageArray[2];
    var concernId = messageArray[3];
    var writerName = messageArray[4];
    var method,isBtn = false;
    switch (title){
        case "myShares":title="我的作品";method = "MyShow";isBtn = true;break;
        case "view":title="最近浏览";method = "Viewed";break;
        case "upvote":title="最近点赞";method = "Upvoted";break;
    }
    $(".titleSpan")[0].innerHTML = title;
    $(".backToIndex").on('click', function () {
        window.location.href = "index.html?" + writerId;
    });
    $(".showBox").on('click', '.showDiv', function () {
        window.location.href = "sharing.html?"+ this.dataset.shareid+"|"+writerId+"|"+writerName;
    }); //  每条分享的单独页面
    var xhrId = new XMLHttpRequest();
    xhrId.onreadystatechange = function () {
        if(xhrId.readyState == 4){
            if((xhrId.status >= 200 && xhrId.status < 300) || xhrId.status == 304){
                var fixedResponse = xhrId.responseText.replace(/\\'/g, "'");
                var shares = JSON.parse(fixedResponse);
                $('.showBox')[0].innerHTML = " ";
                for(var i=0;i<shares.length;i++){
                    var sharing = new Share(shares[i].showId, shares[i].writerId, shares[i].writerName, shares[i].writerSrc, shares[i].info
                        , shares[i].goodNum, shares[i].viewNum, shares[i].comentNum, shares[i].comentId, shares[i].content, shares[i].images, shares[i].create_time, shares[i].label, shares[i].comdSrc, goodId, concernId);
                    sharing.toIndexHtml();
                }
                if(isBtn == true){
                	for(var i = 0;i < $(".btn").length ; i++){
                		$(".btn")[i].style.display = "none"
                	}
                }
                $(".isConcernBtn").on('click', isConcern);
                function isConcern(e) {
                    var info = this.dataset.info;
                    e.stopPropagation();
                    $(this).unbind('click', isConcern);
                    $(this).on('click', cancelConcern);
                    var that = this;
                    var writerId2 = this.dataset.writerid;
                    var message = "writerId="+writerId+"&concernId="+writerId2;
                    var xhrGood = new XMLHttpRequest();
                    xhrGood.onreadystatechange = function () {
                        if(xhrGood.readyState == 4){
                            if((xhrGood.status >= 200 && xhrGood.status < 300) || xhrGood.status == 304){
                                that.innerHTML = "已关注";
                            }else{
                                alert("Request was unsuccessful : " + xhrGood.status)
                            }
                        }
                    };
                    xhrGood.open("post", "http://localhost:8080/wshow/BasicServlet", true);
                    xhrGood.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xhrGood.send('method=addConcern&'+ message);
                };
                $(".cancelConcernBtn").on('click',cancelConcern);
                function cancelConcern(e) {
                    e.stopPropagation();
                    $(this).unbind('click', cancelConcern);
                    $(this).on('click', isConcern);
                    var writerId2 = this.dataset.writerid;
                    var that = this;
                    var message = "writerId="+writerId+"&concernId="+writerId2;
                    var xhrGood = new XMLHttpRequest();
                    xhrGood.onreadystatechange = function () {
                        if(xhrGood.readyState == 4){
                            if((xhrGood.status >= 200 && xhrGood.status < 300) || xhrGood.status == 304){
                                that.innerHTML = "加关注";
                            }else{
                                alert("Request was unsuccessful : " + xhrGood.status)
                            }
                        }
                    };
                    console.log(message);
                    xhrGood.open("post", "http://localhost:8080/wshow/BasicServlet", true);
                    xhrGood.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xhrGood.send('method=cancelConcern&'+ message);
                }
            }else{
                alert("Request was unsuccessful : " + xhrId.status)
            }
        }
    };
    xhrId.open("post", "http://localhost:8080/wshow/BasicServlet", true);
    xhrId.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhrId.send('method=user'+method+'&writerId='+ writerId);
});