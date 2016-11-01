var nav = utils.getElesByClass("nav")[0],
    city = document.getElementById("city"),
    changePlace = document.getElementById("changePlace"),
     place = utils.getElesByClass("place")[0],
    navHidden = utils.getElesByClass("navHidden")[0],
    top = utils.getElesByClass("top")[0],
    close = utils.getElesByClass("close")[0],
    change = utils.getElesByClass("change")[0],
    conLeft = document.getElementById("conLeft"),
     a = city.getElementsByTagName("a"),
     span = city.getElementsByTagName("span"),
    ul=document.getElementById("ul"),
    oNavHidden=document.getElementById("navHidden-bg"),
    screenH=document.documentElement.clientHeight||document.body.clientHeight;

var val = document.documentElement.clientWidth || document.body.clientWidth;
//导航隐藏盒子距离页面左上的值
//获取城市数据
(function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "data.txt?_=" + Math.random(), false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            window.data = utils.jsonParse(xhr.responseText);
        }
    };
    xhr.send(null);
})();
//绑定城市
(function bind() {
    if (data) {
        var cityData = data[0];
        //console.log(cityData);
        var str = "";
        for (var i = 0; i < cityData.length; i++) {
            str += i % 3 === 0 ? '<a class="special" href="javascript:void  0"><span>' + cityData[i].place + '</span></a>' : '<a href="javascript:void  0"><span>' + cityData[i].place + '</span></a>';
        }
        city.innerHTML = str;
    }
})();
function getNavHiddenWith() {
    var l = (val - navWidth) / 2;
    utils.css(navHidden, "left", l);
}
var navText = utils.getElesByClass("navText")[0];
(function bindNavData() {
    if (data) {
        var str = "";
        var curNav = data[1];
        for (var i = 0; i < curNav.length; i++) {
            str += i == 0 ? '<li class="special"><a class="specialA" href="javascript:void 0 ">' + curNav[i].nav + '</a></li>' : ' <li><a href="javascript:void 0">' + curNav[i].nav + '</a></li>';
        }
        navText.innerHTML = str;
    }
})();
(function bindLeftData() {
    if (data) {
        var titleH3 = data[2];
        var project = data[3];
        var strLi = "";
        for (var i = 0; i < titleH3.length; i++) {
            strLi += '<li class="clear">';
                strLi+= '<h3 class="clear">' + titleH3[i].title + '</h3>';
                strLi+= '<span></span>';
                for(var key in project[i]){
                        strLi+= '<a href="javascript:void 0">' + project[i][key] + '</a>';
                }
                strLi+='<div></div>';
            strLi += '</li>';
            //    li[i].innerHTML = strH3[i];
        }
        ul.innerHTML = strLi;
    }
})();
//console.log(li);

//鼠标滑过左侧时,大框出现
var lis=ul.getElementsByTagName("li");
var divWhite=ul.getElementsByTagName("div");
console.log(divWhite);
var ul1=document.getElementById("ul1");
var li=ul1.getElementsByTagName("li");
var listA=ul1.getElementsByTagName("a");
var listSpan=ul1.getElementsByTagName("span");
//向左边隐藏的盒子里面添加内容  data[4]  data[5]
console.log(data[4]);
console.log(data[5]);

//(function leftHiddenData(){
//    if(data[4]&&data[5]){
//        var strLi="";
//        for(var i=0;i<data[4].length;i++){
//            strLi+="<li>";
//            console.log(data[4][i]);
//            var likeArray=utils.listToArray(data[4][i]);
//
//            console.log(likeArray);
//            for(var j=0;j<data[4][i].length;j++){
//                strLi+='<div class="LiDiv clear"></div>';
//            }
//            strLi+="</li>";
//        }
//        ul1.innerHTML=strLi;
//    }
//})();
for(var i = 0 ;i<lis.length;i++){
    (function(i){
        lis[i].onmouseover=li[i].onmouseover=function (){
            var a=utils.css(lis[i],"height");
            var b=ul.offsetLeft+ul.offsetWidth;
            var d=lis[i].offsetTop;
            var e=utils.css(li[i],"height");
            var f=utils.css(lis[i],"height");
            if(i==0){
                utils.css(li[i],"top",ul.offsetTop);
            }else if(i==lis.length-1){
                console.log(e-d+f);
                utils.css(li[i],"top",d-e+f);
            }else{
                utils.css(li[i],"top",d-(e-f)/2);
            }
            utils.css(divWhite[i],"height",a-4);
            utils.css(li[i],"left",b);
            lis[i].style.backgroundColor="white";
            lis[i].style.border="2px solid #c9cbce";
            li[i].style.display=divWhite[i].style.display="block";
        }
    })(i);
}
for(var i = 0 ;i<lis.length;i++){
    (function(i){
        lis[i].onmouseout=li[i].onmouseout=function (){
            lis[i].style.backgroundColor="";
            lis[i].style.border="";
            li[i].style.display=divWhite[i].style.display="none";
        }
    })(i);
}

var right=document.getElementById("right");
var rightSpan=right.getElementsByTagName("span")[0];
var rightA=right.getElementsByTagName("a")[0],
    hidden=document.getElementById("hidden")
var flag=0;
rightA.onclick=function(){
    if(flag){
        rightA.innerHTML="展开";
        rightA.appendChild(rightSpan);
        rightSpan.className="";
        hidden.style.display="none";
        flag=0;
    }else{
        rightA.innerHTML="收起";
        rightA.appendChild(rightSpan);
        rightSpan.className="special";
        hidden.style.display="block";
        flag=1;
    }
};



//搜索框
var input=document.getElementById("input"),
    body=document.body;
body.addEventListener("click", function (e) {
    e=e||window.event;
    e.target=e.target||window.target;
    if(e.target.tagName.toUpperCase()=="INPUT"&&e.target.id=="input"){
        input.placeholder="搜索职位,公司或者地址";
    }else if(e.target.tagName.toUpperCase()=="A"&&e.target.id=="changePlace"){
        with(oNavHidden.style){
            getNavHiddenWith();
            display="block";
            width=val+"px";
            height=screenH+"px";
            position="absolute";
            left=0;
            top=0;
            zIndex=1000;
            backgroundColor="rgba(0,0,0,.5)";
        }
    }else{
        input.placeholder="技术总监";
        //utils.css(navHidden, "display", "none");
        oNavHidden.style.display="none";
    }
});
//表头切换城市-->点击效果
    changePlace.onclick = function () {
        utils.css(navHidden, "display", "block");
        if(!window.navWidth){
            window.navWidth=navHidden.offsetWidth;
        }

        getNavHiddenWith();
    };
    close.onclick = function () {
        utils.css(navHidden, "display", "none");
    };
    change.onclick = function () {
        utils.css(navHidden, "display", "none");
        //console.log(1);
        a.innerHTML=place.innerHTML;
        place.innerHTML = change.innerHTML;
    };
    for (var i = 0; i < a.length; i++) {
        (function (i) {
            a[i].onclick = function () {
                utils.css(navHidden, "display", "none");
                var  temp=place.innerHTML;
                place.innerHTML = change.innerHTML = span[i].innerHTML;
                span[i].innerHTML=temp;
                temp=null;
            };
        })(i);
    }

//固定滚动条
var backTop=document.getElementById("backTop");
window.onmousewheel=function() {
    var footer = document.getElementById("footer"),
        heightMax = document.documentElement.offsetHeight || document.body.offsetHeight,
        screenHeight = window.screenH + body.scrollTop;
    if ( heightMax-screenHeight  > 70) {
        footer.style.bottom = 0 + "px";
    } else  {
        footer.style.bottom = 70-(heightMax-screenHeight) + "px";
    }
    if(body.scrollTop==0){
        utils.css(backTop,"display","none");
    }else{
        utils.css(backTop,"display","block");
    }
};


/*回到顶部*/

backTop.onclick= function () {
    body.scrollTop=0;
    utils.css(backTop,"display","none");
};


/*--图片拖拽--*/
var bottomImg=document.getElementById("bottomImg"),
    aList=bottomImg.getElementsByTagName("a"),
    divList=bottomImg.getElementsByTagName("div");
for(var j=0;j<aList.length;j++){
    drag.moveIn(aList[j],divList[j]);
    drag.moveOut(aList[j],divList[j]);
}


/*--选项卡--*/
var contentText=document.getElementById("contentText");
zftab(contentText,0);
//-->轮播图
var listImg=document.getElementById("listImg"),
    slide=document.getElementById("slide"),
    rightImg=document.getElementById("rightImg"),
    oDiv=rightImg.getElementsByTagName("div"),
    iList=rightImg.getElementsByTagName("i"),
    leftImg=document.getElementById("leftImg"),
    imgList=leftImg.getElementsByClassName("imgList")[0],
    imgs=rightImg.getElementsByTagName("img");

var ImgPlay=(function () {
    function move(step){
        for(var i=0;i<iList.length;i++){
            iList[i].className="";
        }
        //console.log(step);
        if(step>iList.length-1){
            step=0;
        }
        slide.style.top = (step) * 55 + "px";
        iList[step].className="special";
    }
    return {
       move:move
    }
})();
//ImgPlay.init();

for(var i= 0;i<oDiv.length;i++) {
    var curDiv = oDiv[i];
    curDiv.index = i;
    curDiv.onmouseover = function () {
        //timer=null;
        window.clearInterval(timer);
        autoMove(this.index);
        ImgPlay.move(this.index);
        console.dir(window.setInterval);
    };
    curDiv.onmouseout=function () {
        timer=window.setInterval(autoMove,2000);
    }
}
(function () {
  if(data){
      var curData=data[6],
          str="";
      for(var i=0;i<curData.length;i++){
          var ImgData=curData[i];
          str+="<div><img src='"+ImgData.src+"'/></div>";
      }
      str+="<div><img src='"+curData[0].src+"'/></div>";
      utils.css(imgList,"top",(ImgData.length+1)*160);
      imgList.innerHTML=str;
  }
})();
var timer=window.setInterval(autoMove,2000);
//console.dir(window.setInterval);

var step=0;
function autoMove(index){
    if(index){
        step=index;
        animate(imgList,{top:-160*step},300);
        return;
    }
    if(step==imgs.length){
        step=0;
        utils.css(imgList,{"top":-160*step});

    }
    step++;
    animate(imgList,{top:-160*step},300);
    ImgPlay.move(step);
}

//登录
   var dl=document.getElementById("dl");
dl.onclick= function () {
    window.open("detail.html");
};









