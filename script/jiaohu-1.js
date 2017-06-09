/**
 * Created by yitai on 2017/5/18.
 */
Zepto(function ($) {
    var jiaohu_writerId,jiaohu_writerName,jiaohu_writerSrc,concernId;
    var goodId = true;
        (function () {
        var messageOfId = location.search.slice(1);
        if(messageOfId){
            var xhrId = new XMLHttpRequest();
            xhrId.onreadystatechange = function () {
                if(xhrId.readyState == 4){
                    if((xhrId.status >= 200 && xhrId.status < 300) || xhrId.status == 304){
                        var fixedResponse = xhrId.responseText.replace(/\\'/g, "'");
                        var writer = JSON.parse(fixedResponse)[0];
                        jiaohu_writerId = writer.writerId;
                        jiaohu_writerName = writer.writerName;
                        jiaohu_writerSrc = writer.writerSrc;
                        goodId = writer.upvoteShowId.split(" ");
                        concernId = writer.concern;
                        writer = new Writer(writer.writerId, writer.writerName, writer.writerSrc, writer.upvoteShowId.slice(1), writer.colShowId, writer.viewShowId, writer.info, writer.fans, writer.concern, writer.myShow);
                        writer.toIndexHtml();

                        var xhrInterest = new XMLHttpRequest();
                        xhrInterest.onreadystatechange = function () {
                            if(xhrInterest.readyState == 4){
                                if((xhrInterest.status >= 200 && xhrInterest.status < 300) || xhrInterest.status == 304){
                                    var fixedResponse = xhrInterest.responseText.replace(/\\'/g, "'");
                                    var shares = JSON.parse(fixedResponse);
                                    $('.showBox')[0].innerHTML = " ";
                                    for(var i=0;i<shares.length;i++){
                                        var sharing = new Share(shares[i].showId, shares[i].writerId, shares[i].writerName, shares[i].writerSrc, shares[i].info
                                            , shares[i].goodNum, shares[i].viewNum, shares[i].comentNum, shares[i].comentId, shares[i].content, shares[i].images, shares[i].create_time, shares[i].label, shares[i].comdSrc, goodId, concernId);
                                        sharing.toInterestHtml();
                                    }
                                    var xhrFriends = new XMLHttpRequest();
                                    xhrFriends.onreadystatechange = function () {
                                        if(xhrFriends.readyState == 4){
                                            if((xhrFriends.status >= 200 && xhrFriends.status < 300) || xhrFriends.status == 304){
                                                var fixedResponse = xhrFriends.responseText.replace(/\\'/g, "'");
                                                var shares = JSON.parse(fixedResponse);
                                                $('.showBox')[0].innerHTML = " ";
                                                for(var i=0;i<shares.length;i++){
                                                    var sharing = new Share(shares[i].showId, shares[i].writerId, shares[i].writerName, shares[i].writerSrc, shares[i].info
                                                        , shares[i].goodNum, shares[i].viewNum, shares[i].comentNum, shares[i].comentId, shares[i].content, shares[i].images, shares[i].create_time, shares[i].label, shares[i].comdSrc, goodId, concernId);
                                                    sharing.toFriendHtml();
                                                }
                                                $(".isConcernBtn").on('click', isConcern);  //关注
                                                function isConcern(e) {
                                                    var parentDiv = $(this.parentNode.parentNode);
                                                    var writerId = this.dataset.writerid;
                                                    var writerName = parentDiv.find(".writerName")[0].innerHTML;
                                                    var writerSrc = parentDiv.find(".writerImg")[0].src;
                                                    var info = this.dataset.info;
                                                    var newNode = "<div class='peopleMessage' data-writerId='" +
                                                        writerId +
                                                        "'><img class='social_headPhoto' src=" +
                                                        writerSrc +
                                                        "><div class='social_writer'><span class='social_writerName'>" +
                                                        writerName +
                                                        "</span><div class='social_writerInfo'>" +
                                                        info +
                                                        "</div></div><div class='addConcern'> </div> </div>";
                                                    $(".concernPeopleMessageBox")[0].innerHTML += newNode;
                                                    e.stopPropagation();
                                                    $(this).unbind('click', isConcern);
                                                    $(this).on('click', cancelConcern);
                                                    var that = this;
                                                    var message = "writerId="+jiaohu_writerId+"&concernId="+writerId;
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
                                                $(".cancelConcernBtn").on('click',cancelConcern);   //取关
                                                function cancelConcern(e) {
                                                    e.stopPropagation();
                                                    $(this).unbind('click', cancelConcern);
                                                    $(this).on('click', isConcern);
                                                    var that = this;
                                                    var writerId = this.dataset.writerid;
                                                    var parentDiv = $(".concernPeopleMessageBox")[0];
                                                    for(var i=0;i<parentDiv.length;i++){
                                                        if(parentDiv[i].dataset.writerid == writerId){
                                                            removeElement(parentDiv[i]);
                                                            break;
                                                        }
                                                    }
                                                    var message = "writerId="+jiaohu_writerId+"&concernId="+writerId;
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
                                                $(".goodBox").on('click', function (e) {
                                                    var that = this;
                                                    e.stopPropagation();
                                                    var message = "writerId="+jiaohu_writerId+"&showId="+this.dataset.shareid;
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
                                                alert("Request was unsuccessful : " + xhrFriends.status)
                                            }
                                        }
                                    };
                                    xhrFriends.open("post", "http://localhost:8080/wshow/BasicServlet", true);
                                    xhrFriends.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                                    xhrFriends.send('method=queryUserShowByUserConcern&writerId='+ messageOfId);   //请求好友圈
                                }else{
                                    alert("Request was unsuccessful : " + xhrInterest.status)
                                }
                            }
                        };
                        xhrInterest.open("post", "http://localhost:8080/wshow/BasicServlet", true);
                        xhrInterest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        xhrInterest.send('method=RecommendationUserShow&writerId='+ messageOfId);   //请求个性推荐


                    }else{
                        alert("Request was unsuccessful : " + xhrId.status)
                    }
                }
            };
            xhrId.open("post", "http://localhost:8080/wshow/BasicServlet", true);
            xhrId.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhrId.send('method=queryUserByWriterId&writerId='+ messageOfId);
        }
    }());    //登陆对个人信息的请求
    
        (function() {
            var floatDiv = $("#foot_float_div")[0];
            var boxWidth = $('.foot')[0].offsetWidth/4;
            floatDiv.style.width = boxWidth + "px";
            document.body.style.overflow='hidden';
            var tBoxes = $('.mainBox');
            for (var i = 1; i < tBoxes.length; i++) {
                tBoxes[i].style.display = "none";
            }
            var footBoxes = $('.footBox');
            $('.foot').on('click', ".footBox", change);
            function change() {
                for (var i = 0; i < footBoxes.length; i++) {
                    var Array = footBoxes[i].className.split(" ");
                    if (Array[Array.length - 1] == "choose") {
                        Array.pop();
                        footBoxes[i].className = Array.join(" ");
                    }
                    if(this.className == footBoxes[i].className){floatDiv.style.left = this.offsetLeft + 'px';}
                }
                var tName= this.className;
                this.className +=" choose";
                tName ='mainBox i' + tName.split(" ")[0];
                for (var i = 0; i < tBoxes.length; i++) {
                    if (tBoxes[i].className == tName) {
                        tBoxes[i].style.display = "block";
                    }
                    else {
                        tBoxes[i].style.display = "none";
                    }
                }
            }//切换页面
        }());                    //foot菜单

        (function () {
            var btn = $("#addcard");
            var hideDiv = $(".hidecards")[0];
            var flag = false;
            var card = $(".card");
            var cards = $(".cards")[0];
            var hideCards = $(".hidecards")[0];
            var addcard = $("#addcard")[0];
            var hideWords = $("#hideWords")[0];
            var num = 0;


            btn.on('click', btnClick);
            function btnClick() {
                btn.unbind('click', btnClick);
                if(flag) {
                    hideWords.style.width = hideCards.offsetWidth + 'px';
                    hideWords.style.height = hideCards.offsetHeight- 5 + 'px';
                    hideDiv.className += " zoomOut";
                    sendCards();
                    setTimeout(function () {
                        hideDiv.style.display = "none";
                        $(".card").unbind('click', choose);
                        var Array = hideDiv.className.split(" ");
                        Array.pop();
                        hideDiv.className = Array.join(" ");
                        hideWords.style.display = "flex";
                        btn.on('click', btnClick);
                    },500);
                    flag = false;
                }else{
                    hideWords.style.display = "none";
                    hideDiv.className += " zoomIn";
                    hideDiv.style.display = "block";
                    if(num == 0){
                        hideWords.innerHTML = "根据您的个性标签，我们推荐了以下的分享";
                    }
                    $(".card").on('click', choose);
                    setTimeout(function () {
                        var Array = hideDiv.className.split(" ");
                        Array.pop();
                        hideDiv.className = Array.join(" ");
                        btn.on('click', btnClick);
                    },1000);
                    flag = true;
                    num++;
                }
            }       //标签栏的打开/关闭

            function choose(e) {
                e = event || window.event;
                if(e.target.parentNode.className == "cards"){
                    $(this).unbind('click', choose);//1
                    e.target.className += " bounceOut";
                    setTimeout(function () {
                        var Array = e.target.className.split(" ");
                        Array.pop();
                        e.target.className = Array.join(" ");
                        var newNode = e.target.cloneNode(true);
                        removeElement(e.target);
                        newNode.className += " bounceIn";
                        hideCards.appendChild(newNode);
                        setTimeout(function () {
                            var Array = newNode.className.split(" ");
                            Array.pop();
                            newNode.className = Array.join(" ");

                            $(newNode).on('click', choose);//2
                        },500);
                    },500);
                }else if(e.target.parentNode.className == "hidecards animated"){
                    $(this).unbind('click', choose);//3
                    e.target.className += " bounceOut";
                    setTimeout(function () {
                        var Array = e.target.className.split(" ");
                        Array.pop();
                        e.target.className = Array.join(" ");
                        var newNode = e.target.cloneNode(true);
                        removeElement(e.target);
                        newNode.className += " bounceIn";
                        cards.insertBefore(newNode,cards.childNodes[0]);
                        setTimeout(function () {
                            var Array = newNode.className.split(" ");
                            Array.pop();
                            newNode.className = Array.join(" ");
                            $(newNode).on('click', choose);//4
                        },500);
                    },500);
                }
            }        //标签的选取

            function removeElement(_element){
                var _parentElement = _element.parentNode;
                if(_parentElement){
                    _parentElement.removeChild(_element);
                }
            }        //删除节点
            
            /*var a = new Share(12, 13, "abb", "images/class1.jpg", 123, 534, 34, 13, "i like this", "images/class3.jpg", "5-20", "life man", "baidu.com", "none");
            a.toIndexHtml();
            a.toFriendHtml();*/
            function sendCards() {
                var array = $(".cards").children('.card');
                var message = "";
                for(var i=0;i<array.length;i++) {
                    var labelName = array[i].innerText;
                    labelName = labelChange(labelName);
                    message += labelName;
                    message += " ";
                }
                console.log(message);
                var xhrNewId = new XMLHttpRequest();
                xhrNewId.onreadystatechange = function () {
                    if(xhrNewId.readyState == 4){
                        if((xhrNewId.status >= 200 && xhrNewId.status < 300) || xhrNewId.status == 304){
                            var fixedResponse = xhrNewId.responseText.replace(/\\'/g, "'");
                            var writer = JSON.parse(fixedResponse)[0];
                            goodId = writer.upvoteShowId.split(" ");
                            concernId = writer.concern;
                            writer = new Writer(writer.writerId, writer.writerName, writer.writerSrc, writer.upvoteShowId.slice(1), writer.colShowId, writer.viewShowId, writer.info, writer.fans, writer.concern, writer.myShow);
                            writer.toIndexHtml();
                            
                        }else{
                            alert("Request was unsuccessful : " + xhrNewId.status)
                        }
                    }
                };
                xhrNewId.open("post", "http://localhost:8080/wshow/BasicServlet", false);
                xhrNewId.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhrNewId.send('method=queryUserByWriterId&writerId='+ jiaohu_writerId);//重新请求goodId
                
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if(xhr.readyState == 4){
                        if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                            var fixedResponse = xhr.responseText.replace(/\\'/g, "'");
                            var shares = JSON.parse(fixedResponse);
                            $('.showBox')[0].innerHTML = " ";
                            for(var i=0;i<shares.length;i++){
                                var sharing = new Share(shares[i].showId, shares[i].writerId, shares[i].writerName, shares[i].writerSrc, shares[i].info
                                    , shares[i].goodNum, shares[i].viewNum, shares[i].comentNum, shares[i].comentId, shares[i].content, shares[i].images, shares[i].create_time, shares[i].label, shares[i].comdSrc, goodId, concernId);
                                sharing.toIndexHtml();
                            }

                            $(".isConcernBtn").on('click', isConcern);  //关注
                            function isConcern(e) {
                                var parentDiv = $(this.parentNode.parentNode);
                                var writerId = this.dataset.writerid;
                                var writerName = parentDiv.find(".writerName")[0].innerHTML;
                                var writerSrc = parentDiv.find(".writerImg")[0].src;
                                var info = this.dataset.info;
                                var newNode = "<div class='peopleMessage' data-writerId='" +
                                writerId +
                                "'><img class='social_headPhoto' src=" +
                                writerSrc +
                                "><div class='social_writer'><span class='social_writerName'>" +
                                writerName +
                                "</span><div class='social_writerInfo'>" +
                                info +
                                "</div></div><div class='addConcern'> </div> </div>";
                                $(".concernPeopleMessageBox")[0].innerHTML += newNode;
                            	e.stopPropagation();
                            	$(this).unbind('click', isConcern);
                            	$(this).on('click', cancelConcern);
                                var that = this;
                                var message = "writerId="+jiaohu_writerId+"&concernId="+writerId;
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
                            $(".cancelConcernBtn").on('click',cancelConcern);   //取关
                            function cancelConcern(e) {
                            	e.stopPropagation();
                            	$(this).unbind('click', cancelConcern);
                            	$(this).on('click', isConcern);
                                var that = this;
                                var writerId = this.dataset.writerid;
                                var parentDiv = $(".concernPeopleMessageBox")[0];
                                for(var i=0;i<parentDiv.length;i++){
                                    if(parentDiv[i].dataset.writerid == writerId){
                                        removeElement(parentDiv[i]);
                                        break;
                                    }
                                }
                                var message = "writerId="+jiaohu_writerId+"&concernId="+writerId;
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
                            $(".goodBox").on('click', function (e) {
                            	var that = this;
                                e.stopPropagation();
                                var message = "writerId="+jiaohu_writerId+"&showId="+this.dataset.shareid;
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
                console.log(message);
                xhr.open("post", "http://localhost:8080/wshow/BasicServlet", true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send('method=queryUserShowByLabel&label='+ message + "&writerId="+ jiaohu_writerId);
            }       //向后台发送标签
        }  ()) ;            //操作标签

        $(".toSocial").on('click', function () {
            $(".socialBox")[0].style.display = "block";
            $(".indexBox")[0].style.display = "none";
        });

        $(".backToIndex").on('click', function () {
            console.log("click");
            $(".socialBox")[0].style.display = "none";
            $(".indexBox")[0].style.display = "block";
        });//返回首页

        $("#changeMessageBtn").on('click', function () {
            window.location.href = "changeMessage.html?" + jiaohu_writerId;
        }); //更改个人信息
        
        (function () {
            var fansDiv = $(".fansPeopleMessageBox")[0];
            var conCern = $(".concernPeopleMessageBox")[0];
            var parentDiv = $(".changePeople")[0];
            var floatDiv = $("#floatDiv")[0];
            toConcernBox();
            floatDiv.style.left = "45%";
            $(".concernBtn").on('click', toConcernBox);
            function toConcernBox () {
                fansDiv.style.display = "none";
                conCern.style.display = "block";
                floatDiv.style.width = "42px";
                floatDiv.style.left = $(".concernBtn")[0].offsetLeft + "px";
            } //关注人栏
            $(".fansBtn").on('click', toFansBox);
            function toFansBox () {
                fansDiv.style.display = "block";
                conCern.style.display = "none";
                floatDiv.style.width = "28px";
                floatDiv.style.left = $(".fansBtn")[0].offsetLeft + "px";
            } //粉丝栏
        }());   //粉丝与关注的切换
        $(".toWriterShare").on('click', function () {
            var title;
            if(this.innerHTML == "最近浏览"){
                title = "view";
            }else if(this.innerHTML == "最近点赞"){
                title = "upvote";
            }else{
                title = "myShares";
            }
        	alert(title);
            window.location.href = "writerShare.html?" + jiaohu_writerId +"|" + title +"|" + goodId + "|" + concernId + "|" + jiaohu_writerName;
        });
        var showDives = $(".showDiv");
        $(".showBox").on('click', '.showDiv', function () {
            if(jiaohu_writerId){
                window.location.href = "sharing.html?"+ this.dataset.shareid+"|"+jiaohu_writerId+"|"+jiaohu_writerName;
            }else{
                window.location.href = "sharing.html?"+ this.dataset.shareid;
            }
        }); //  每条分享的单独页面

        $(".logout").on("click", function () {
            console.log("1");
            window.location.href = "login.html";
        });
        $(".makeShare").on('click', function () {
            window.location.href = "makeShare.html?"+jiaohu_writerId+"|"+jiaohu_writerName+"|"+jiaohu_writerSrc;
        });

});