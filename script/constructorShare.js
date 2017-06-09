function Share(shareId, writerId, writerName, writerSrc, info, goodNum, viewNum, comentNum, comentId, content, images, updateTime, label, comdSrc, goodId, concernId) { //分享的构造函数
    this.shareId = shareId;
    this.writerId = writerId;
    this.writerName = writerName;
    this.writerSrc = writerSrc;
    this.info = info;
    this.goodNum = goodNum;
    this.viewNum = viewNum;
    this.comentNum = comentNum;
    this.comentId = comentId;
    this.content = content;
    this.images = images;
    this.updateTime = updateTime;
    this.label = label;
    this.comdSrc = comdSrc;
    this.goodId = goodId;
    this.concernId = concernId;
} //分享的构造函数

Share.prototype = {
    constructor: Share,
    toIndexHtml: function () {
        if (this.concernId != "") {
            var concern = this.concernId.slice(1).split(" ");
        }else{
        	concern = "none";
        }
        var btn_word = "加关注";
        var btn_btn = "isConcernBtn";
        console.log(concern);
        console.log(this.writerId);
        for(var i=0;i<concern.length;i++){
            if(concern[i] == this.writerId){
                btn_word = "已关注";
                btn_btn = "cancelConcernBtn";
                break;
            }
        }
        var vote = false;
        for (var j = 0; j < this.goodId.length; j++) {
            if (this.shareId == this.goodId[j]) {
                vote = true;
                break;
            }
        }
        if (vote == true) {
            vote = "images/goodTrue.svg";
        } else {
            vote = "images/good.svg";
        }
        var newNode = "<div class='showDiv' data-shareid='" +
            this.shareId +
            "'> <div class='writerDiv'><img class='writerImg' src='" +
            this.writerSrc +
            "'><div class='timeDiv'><a href='#' class='writerName'>" +
            this.writerName +
            "</a><br/><span class='updateTime'>" +
            this.updateTime +
            "</span></div><button type='button' class='btn btn-default addConcernBtn " +
            btn_btn +
            "' data-writerid='" +
            this.writerId +
            "' data-info='" +
                this.info +
            "'>" +
            btn_word +
            "</button></div> <div class='decDiv'> <span class='showWords'>" +
            this.content +
            "</span> " +
            "<div class='decImgs'><img class='showImg' src='" +
            this.images +
            "' alt='loading'></div> </div> <div class='labelDiv'>" +
            labelParse(this.label) +
            "</div> <a href='" + this.comdSrc +
            "' class='check'>查看商品详情</a><div class='numBox'> <div class='numBoxIn'>" +
            "<img class='numImg' src='images/browse.svg'><span class='browseNum number'>" +
            this.viewNum +
            "</span></div> <div class='numBoxIn'><img class='numImg' src='images/comments.svg'>" +
            "<span class='conmmentNum number'>" +
            this.comentNum +
            "</span></div> <div class='numBoxIn goodBox'data-shareid='" +
            this.shareId +
            "'><img class='numImg GoodImg' src='" +
            vote +
            "'><span class='goodNum number'>" +
            this.goodNum +
            "</span></div> </div> </div>";
        $(".showBox")[0].innerHTML += newNode;

    },
    toFriendHtml: function () {
        if (this.concernId != "") {
            var concern = this.concernId.slice(1).split(" ");
        }else{
            concern = "none";
        }
        var btn_word = "加关注";
        var btn_btn = "isConcernBtn";
        console.log(concern);
        console.log(this.writerId);
        for(var i=0;i<concern.length;i++){
            if(concern[i] == this.writerId){
                btn_word = "已关注";
                btn_btn = "cancelConcernBtn";
                break;
            }
        }
        var vote = false;
        for (var j = 0; j < this.goodId.length; j++) {
            if (this.shareId == this.goodId[j]) {
                vote = true;
                break;
            }
        }
        if (vote == true) {
            vote = "images/goodTrue.svg";
        } else {
            vote = "images/good.svg";
        }
        var newNode = "<div class='showDiv' data-shareid='" +
            this.shareId +
            "'> <div class='writerDiv'><img class='writerImg' src='" +
            this.writerSrc +
            "'><div class='timeDiv'><a href='#' class='writerName'>" +
            this.writerName +
            "</a><br/><span class='updateTime'>" +
            this.updateTime +
            "</span></div><button type='button' class='btn btn-default addConcernBtn " +
            btn_btn +
            "' data-writerid='" +
            this.writerId +
            "' data-info='" +
            this.info +
            "'>" +
            btn_word +
            "</button></div> <div class='decDiv'> <span class='showWords'>" +
            this.content +
            "</span> " +
            "<div class='decImgs'><img class='showImg' src='" +
            this.images +
            "' alt='loading'></div> </div> <div class='labelDiv'>" +
            labelParse(this.label) +
            "</div> <a href='" + this.comdSrc +
            "' class='check'>查看商品详情</a><div class='numBox'> <div class='numBoxIn'>" +
            "<img class='numImg' src='images/browse.svg'><span class='browseNum number'>" +
            this.viewNum +
            "</span></div> <div class='numBoxIn'><img class='numImg' src='images/comments.svg'>" +
            "<span class='conmmentNum number'>" +
            this.comentNum +
            "</span></div> <div class='numBoxIn goodBox'data-shareid='" +
            this.shareId +
            "'><img class='numImg GoodImg' src='" +
            vote +
            "'><span class='goodNum number'>" +
            this.goodNum +
            "</span></div> </div> </div>";
        $(".showBox")[1].innerHTML += newNode;
    },
    toInterestHtml: function () {
        if (this.concernId != "") {
            var concern = this.concernId.slice(1).split(" ");
        }else{
            concern = "none";
        }
        var btn_word = "加关注";
        var btn_btn = "isConcernBtn";
        console.log(concern);
        console.log(this.writerId);
        for(var i=0;i<concern.length;i++){
            if(concern[i] == this.writerId){
                btn_word = "已关注";
                btn_btn = "cancelConcernBtn";
                break;
            }
        }
        var vote = false;
        for (var j = 0; j < this.goodId.length; j++) {
            if (this.shareId == this.goodId[j]) {
                vote = true;
                break;
            }
        }
        if (vote == true) {
            vote = "images/goodTrue.svg";
        } else {
            vote = "images/good.svg";
        }
        var newNode = "<div class='showDiv' data-shareid='" +
            this.shareId +
            "'> <div class='writerDiv'><img class='writerImg' src='" +
            this.writerSrc +
            "'><div class='timeDiv'><a href='#' class='writerName'>" +
            this.writerName +
            "</a><br/><span class='updateTime'>" +
            this.updateTime +
            "</span></div><button type='button' class='btn btn-default addConcernBtn " +
            btn_btn +
            "' data-writerid='" +
            this.writerId +
            "' data-info='" +
            this.info +
            "'>" +
            btn_word +
            "</button></div> <div class='decDiv'> <span class='showWords'>" +
            this.content +
            "</span> " +
            "<div class='decImgs'><img class='showImg' src='" +
            this.images +
            "' alt='loading'></div> </div> <div class='labelDiv'>" +
            labelParse(this.label) +
            "</div> <a href='" + this.comdSrc +
            "' class='check'>查看商品详情</a><div class='numBox'> <div class='numBoxIn'>" +
            "<img class='numImg' src='images/browse.svg'><span class='browseNum number'>" +
            this.viewNum +
            "</span></div> <div class='numBoxIn'><img class='numImg' src='images/comments.svg'>" +
            "<span class='conmmentNum number'>" +
            this.comentNum +
            "</span></div> <div class='numBoxIn goodBox'data-shareid='" +
            this.shareId +
            "'><img class='numImg GoodImg' src='" +
            vote +
            "'><span class='goodNum number'>" +
            this.goodNum +
            "</span></div> </div> </div>";
        $(".showBox")[2].innerHTML += newNode;

    }
}//分享的方法

function Coment(writerId, writerName, writerSrc, shareId, comentId, goodNum, content, create_time, comentGoodId) {
    this.writerId = writerId;
    this.writerName = writerName;
    this.writerSrc = writerSrc;
    this.shareId = shareId;
    this.comentId = comentId;
    this.goodNum = goodNum;
    this.content = content;
    this.create_time = create_time;
    console.log(comentGoodId);
    this.comentGoodId = comentGoodId;
}

Coment.prototype = {
    constructor: Coment,
    toShare: function () {
        var vote = false;
        if (this.comentGoodId == undefined) {
            this.comentGoodId = " "
        }
        ;
        for (var j = 0; j < this.comentGoodId.length; j++) {
            if (this.comentId == this.comentGoodId[j]) {
                vote = true;
                break;
            }
        }
        if (vote == true) {
            vote = "images/goodTrue.svg";
        } else {
            vote = "images/good.svg";
        }
        var newNode = "<div class='comment'><div class='comLeft'><img class='comImg Img' src=" +
            this.writerSrc +
            " alt='#comImg'></div><div class='comRight'><div class='comWiter'><div style='position:relative'><a href='#' class='comWriterName'>" +
            this.writerName +
            "</a><br><span class='comUpdateTime'>" +
            this.create_time +
            "</span> </div><div class='comGood'><div class='numBoxInC'data-comentId = '" +
            this.comentId +
            "'><img class='numImg' src='" +
            vote +
            "'><span class='goodNum number'>" +
            this.goodNum +
            "</span> </div> </div> </div> <div class='comWords'>" +
            this.content +
            "</div> </div> </div>"
        $(".commentBox")[0].innerHTML += newNode;
    }
}//评论的构造函数

function Writer(writerId, writerName, writerSrc, upvoteShowId, colShowId, viewShowId, info, fans, concern, myShow, passWord, upvoteComentId) {
    this.writerId = writerId;
    this.writerName = writerName;
    this.writerSrc = writerSrc;
    this.upvoteShowId = upvoteShowId;//点赞
    this.colShowId = colShowId; //收藏
    this.viewShowId = viewShowId;//浏览
    this.info = info;
    this.fans = fans;
    this.concern = concern;
    this.myShow = myShow;
    this.passWord = passWord;
    this.upvoteComentId = upvoteComentId;
}

Writer.prototype = {
    constructor: Writer,
    toIndexHtml: function () {
    	var OwriterId = this.writerId;
        $("#photoImg")[0].src = this.writerSrc;
        $("#myName")[0].innerHTML = this.writerName;
        $("#myWord")[0].innerHTML = this.info;
        if (this.myShow == "") {
            $(".proNum")[0].innerHTML = "(0)";
        } else {
            console.log(this.myShow);
            $(".proNum")[0].innerHTML = "("+this.myShow.slice(1).split(" ").length+")";
        }
        var fansNewNode = "";
        var concernNewNode = "";
        if(this.concern != "") {
        	console.log(this.concern);
            var concern = this.concern.slice(1).split(" ");
            for (var i = 0; i < concern.length; i++) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                            var fixedResponse = xhr.responseText.replace(/\\'/g, "'");
                            var writer = JSON.parse(fixedResponse)[0];
                            concernNewNode += "<div class='peopleMessage' data-writerId='" +
                                writer.writerId +
                                "'><img class='social_headPhoto' src=" +
                                writer.writerSrc +
                                "><div class='social_writer'><span class='social_writerName'>" +
                                writer.writerName +
                                "</span><div class='social_writerInfo'>" +
                                writer.info +
                                "</div></div><div class='addConcern'><img class='addConcern_img' src='images/friend.svg'><span class='addConcern_word'>互相关注</span> </div> </div>"
                        } else {
                            alert("Request was unsuccessful : " + xhr.status);
                        }
                    }
                };
                xhr.open("post", "http://localhost:8080/wshow/BasicServlet", false);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                console.log(concern[i]);
                xhr.send('method=queryUserByWriterId&writerId=' + concern[i]);      //请求好友数据
            }
        }
        if (this.fans != ""){
        	var fans = this.fans.slice(1).split(" ");
        	console.log(fans);
            for (var i = 0; i < fans.length; i++) {
                var isConcern = "加关注";
                var isConcernImg = "images/friend_add.svg";
                if(concern){
                	for (var j = 0; j < concern.length; j++) {
                    if (fans[i] == concern[j]) {
                        isConcern = "互相关注";
                        isConcernImg = "images/friend.svg";
                        break;
                    }
                }
                }
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                            var fixedResponse = xhr.responseText.replace(/\\'/g, "'");
                            var writer = JSON.parse(fixedResponse)[0];
                            fansNewNode += "<div class='peopleMessage' data-writerId='" +
                                writer.writerId +
                                "'><img class='social_headPhoto' src=" +
                                writer.writerSrc +
                                "><div class='social_writer'><span class='social_writerName'>" +
                                writer.writerName +
                                "</span><div class='social_writerInfo'>" +
                                writer.info +
                                "</div></div><div class='addConcern'><img class='addConcern_img' src='" +
                                isConcernImg +
                                "'><span class='addConcern_word'>" +
                                isConcern +
                                "</span> </div> </div>"
                        } else {
                            alert("Request was unsuccessful : " + xhr.status);
                        }
                    }
                }
                xhr.open("post", "http://localhost:8080/wshow/BasicServlet", false);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send('method=queryUserByWriterId&writerId=' + fans[i]);      //请求好友数据
            }
        }
    
        $('.fansPeopleMessageBox')[0].innerHTML = fansNewNode;//粉丝栏
        $('.concernPeopleMessageBox')[0].innerHTML = concernNewNode;//关注人栏
    	console.log("1");
        $(".addConcern").on('click', addOrCancel);
        function addOrCancel() {
        	console.log("1");
            var parentDiv = this.parentNode;
            var writerId = parentDiv.dataset.writerid;
            var message = "writerId="+OwriterId+"&concernId="+writerId;
            var word = "互相关注";
            var src = "images/friend.svg";
            var allDiv = $(".peopleMessage");
            console.log(allDiv);
            var concernDiv = $(".concernPeopleMessageBox").find(".peopleMessage");
            if($(this).find(".addConcern_word")[0].innerHTML == "互相关注"){
            	console.log("2");
                word = "加关注";
                src = "images/friend_add.svg";
                for(var i=0;i<allDiv.length;i++){
                    if(allDiv[i].dataset.writerid == writerId){
                        allDiv[i].childNodes[2].childNodes[0].src = src;
                        allDiv[i].childNodes[2].childNodes[1].innerHTML = word;
                    }
                }
                for(var i=0;i<concernDiv.length;i++){
                    if(concernDiv[i].dataset.writerid == writerId){
                        removeElement(concernDiv[i]);
                    }
                }
                var xhr= new XMLHttpRequest();
                xhr.open("post", "http://localhost:8080/wshow/BasicServlet", false);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send('method=cancelConcern&'+ message);
            }else{
            	console.log("3");
                for(var i=0;i<allDiv.length;i++){
                    if(allDiv[i].dataset.writerid == writerId){
                    	console.log(allDiv[i]);
                        allDiv[i].childNodes[2].childNodes[0].src = src;
                        allDiv[i].childNodes[2].childNodes[1].innerHTML = word;
                    }
                }
                var newNode = parentDiv.cloneNode(true);
                $(".concernPeopleMessageBox")[0].appendChild(newNode);
                $(".addConcern").unbind('click', addOrCancel);
                $(".addConcern").on('click', addOrCancel);
                var xhr= new XMLHttpRequest();
                xhr.open("post", "http://localhost:8080/wshow/BasicServlet", false);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send('method=addConcern&'+ message);
            }
        }
    }

}


console.log("ok");
function labelParse(labels) {
    labels = labels.split(" ");
    var parseString = "";
    for (var i = 0; i < labels.length; i++) {
        var j = Math.floor(Math.random() * 6 + 1);
        j = numToStyle(j);
        parseString += " <span class='label label-" + j + " card'>" + labelChange(labels[i]) + "</span> ";

    }
    return parseString;
}

function numToStyle(num) {
    switch (num) {
        case 1:
            num = "danger";
            break;
        case 2:
            num = "warning";
            break;
        case 3:
            num = "primary";
            break;
        case 4:
            num = "success";
            break;
        case 5:
            num = "info";
            break;
        case 6:
            num = "default";
            break;
    }
    return num;
} //span颜色

function labelChange(labelName) {
    switch (labelName) {
        case "国际特卖":
            labelName = "sale";
            break;
        case "家具家电":
            labelName = "furniture";
            break;
        case "男士":
            labelName = "man";
            break;
        case "美妆":
            labelName = "beauty";
            break;
        case "女装":
            labelName = "lady";
            break;
        case "母婴":
            labelName = "mom";
            break;
        case "运动":
            labelName = "sport";
            break;
        case "配饰":
            labelName = "acc";
            break;
        case "爱丽奢":
            labelName = "aili";
            break;
        case "生活":
            labelName = "life";
            break;
        case "金融":
            labelName = "financial";
            break;
        case "鞋包":
            labelName = "shoe";
            break;
        case "sale":
            labelName = "国际特卖";
            break;
        case "furniture":
            labelName = "家具家电";
            break;
        case "man":
            labelName = "男士";
            break;
        case "beauty":
            labelName = "美妆";
            break;
        case "lady":
            labelName = "女装";
            break;
        case "mom":
            labelName = "母婴";
            break;
        case "sport":
            labelName = "运动";
            break;
        case "acc":
            labelName = "配饰";
            break;
        case "aili":
            labelName = "爱丽奢";
            break;
        case "life":
            labelName = "生活";
            break;
        case "financial":
            labelName = "金融";
            break;
        case "shoe":
            labelName = "鞋包";
            break;
        default :
            labelName = "none";
            break;
    }
    return labelName;
}   //中英转换

function removeElement(_element) {
    var _parentElement = _element.parentNode;
    if (_parentElement) {
        _parentElement.removeChild(_element);
    }
}   //删除子节点
