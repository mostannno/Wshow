/**
 * Created by yitai on 2017/5/19.
 */
Zepto(function ($) {
    var make_message = location.search.slice(1);
    var messageWriterId, writerName, writerSrc;
    var messageArray = make_message.split("|");
    messageWriterId = messageArray[0];
    writerName = messageArray[1];
    writerSrc = messageArray[2];

    var base = "";
    $('#file').on('change', function () {
        alert("done");
        lrz(this.files[0])
            .then(function (rst) {
                base = rst.base64;
                $(".upImg")[0].src = base;
            })
            .always(function () {
                // 不管是成功失败，都会执行
            });
    });         //上传图片

    (function () {
        var labelBox = $('.labelBox'); //获取隐藏的标签div
        var comdBox = $('.comdBox');   //获取商品div
        var btnLabel = $('.addLabel'); //获取添加标签的按钮
        var btnGoods = $('.addGoods'); //获取添加商品的按钮
        comdBox.css({'z-index':-2,'opacity':0,'top':btnGoods[0].offsetTop});
        var flag1 = false;
        var flag2 = false;
        comdBox.css({'z-index':-2,'opacity':0,'top':btnLabel[0].offsetTop});
        btnLabel.on('click', function () {
            if(flag1){      //关闭第一个
                    labelBox.css({'z-index':-2,'opacity':0,'top':btnLabel[0].offsetTop});
                    btnGoods.css('margin-top',0);
                    flag1 = false;
                    if(flag2){      //如果第二个已被打开
                        comdBox.css('top',btnLabel[0].offsetHeight*2);
                    }else{      //如果第二个关闭
                        comdBox.css('top',btnLabel[0].offsetHeight);
                    }
            }else{  //打开第一个
                    labelBox.css({'z-index':2,'opacity':1,'top':btnLabel.css('height')});
                    btnGoods.css('margin-top',labelBox.css('height'));
                    flag1 = true;
                    if(flag2){      //如果第二个已被打开
                        comdBox.css('top',labelBox[0].offsetHeight + btnLabel[0].offsetHeight*2);
                    }else{      //如果第二个关闭
                        comdBox.css('top',labelBox[0].offsetHeight + btnLabel[0].offsetHeight);
                    }

            }
        });     //标签栏的打开/关闭

        btnGoods.on('click', function () {
            if(flag2){
                comdBox.css({'z-index':-2,'opacity':0,'top':btnGoods[0].offsetTop});
                flag2 = false;
            }else{
                comdBox.css({'z-index':2,'opacity':1,'top':btnGoods[0].offsetTop + btnLabel[0].offsetHeight});
                flag2 = true;
            }
        })      //商品链接栏的打开/关闭

        var chooseNum = 0;
        $(".label").on('click', function () {
            if(this.dataset.choose == "unchoosed"){
                if(chooseNum == 5){
                    alert("最多选取5个标签！");
                }else{
                    chooseNum++;
                    var choose = new Image();
                    choose.src = 'images/choose.png';
                    choose.className = 'chooseImg ';
                    this.newNode = $('.labelBox')[0].appendChild(choose);
                    var left = this.offsetLeft + 45 + 'px';
                    var top = this.offsetTop + 15 + 'px';
                    choose.style.left =  left;
                    choose.style.top = top;
                    this.dataset.choose = "choosed";
                }
            }else{
                removeElement(this.newNode);
                this.dataset.choose = "unchoosed";
                chooseNum--;
            }
        });
        $(".cancel").on('click', function(){
        	window.history.back();
        });
        $(".share").on('click', function () {
            if(base == ""){alert("请选择分享图片！");
            }else{
                var labelString = "";
                var labelSpan = $(".label");
                for(var i=0;i<labelSpan.length;i++) {
                    if (labelSpan[i].dataset.choose == "choosed") {
                        labelString += labelChange(labelSpan[i].innerHTML);
                        labelString += " ";
                    }
                }
                var message = "writerId="+messageWriterId+"&writerName="+writerName+"&writerSrc="+writerSrc+"&content="+$(".textMessage")[0].value+ "&label="+labelString+"&comdSrc="+$(".addSrc")[0].value+"&images=" +base;
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if(xhr.readyState == 4){
                        if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                            window.location.href = "index.html?" + messageWriterId;
                        }else{
                            alert("Request was unsuccessful : " + xhr.status)
                        }
                    }
                };
                console.log(message);
                xhr.open("post", "http://localhost:8080/wshow/BasicServlet", true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send('method=issueUserShow&'+ message);
            }
        });
    }());                                                   //上传标签管理
    
});