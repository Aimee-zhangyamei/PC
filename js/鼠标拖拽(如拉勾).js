var drag= (function () {
        function getDirection(ele1,e){
            var x=e.pageX-utils.offset(ele1).left-ele1.offsetWidth/2,
                y=utils.offset(ele1).top+ele1.offsetHeight/2-e.pageY,
                angle=Math.atan2(y,x)*180/Math.PI,
                a=Math.round((angle+180)/90)%4;
            //console.log(x,y,angle);
            //console.log(e.pageX,e.clientY);
            //console.log(utils.offset(ele1),y,a);
            return a;
        }
        function moveIn(ele1,ele2){
            ele1.onmouseenter= function (e) {
                e=e||window.event;
                var res=getDirection(this,e);
                switch (res){
                    case 0:
                        utils.css(ele2,{left:-200,top:0});
                        break;
                    case 1:
                        utils.css(ele2,{left:0,top:200});
                        break;

                    case 2:
                        utils.css(ele2,{left:200,top:0});
                        break;
                    case 3:
                        utils.css(ele2,{left:0,top:-200});
                        break;
                }
                animate(ele2,{left:0,top:0},100);
            }
        }
        function moveOut(ele1,ele2){
            ele1.onmouseleave= function (e) {
                var res=getDirection(this,e);
                switch (res){
                    case 0:
                        animate(ele2,{left:-200,top:0},100);
                        break;
                    case 1:
                        animate(ele2,{left:0,top:200},100);
                        break;
                    case 2:
                        animate(ele2,{left:200,top:0},100);
                        break;
                    case 3:
                        animate(ele2,{left:0,top:-200},100);
                        break;
                }
            }
        }
        return {
            moveIn:moveIn,
            moveOut:moveOut
        }
})();






