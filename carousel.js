var $carousel=(function(){
    var html=''
        +'<div class="slider" id="slider">'
            +'<div class="slide"><img src="img/b5.png" alt=""></div>'
            +'<div class="slide"><img src="img/b1.png" alt=""></div>'
            +'<div class="slide"><img src="img/b2.png" alt=""></div>'
            +'<div class="slide"><img src="img/b3.png" alt=""></div>'
            +'<div class="slide"><img src="img/b4.png" alt=""></div>'
            +'<div class="slide"><img src="img/b5.png" alt=""></div>'
            +'<div class="slide"><img src="img/b1.png" alt=""></div>'
        +'</div>'
        +'<span id="left"><</span>'
        +'<span id="right">></span>'
        +'<ul class="nav" id="navs">'
            +'<li>1</li>'
            +'<li>2</li>'
            +'<li>3</li>'
            +'<li>4</li>'
            +'<li>5</li>'
        +'</ul>'
        function show(conf){
            $(conf).html(html);
            //获取页面元素
            var $box=$('#box'),
                $left=$('#left'),
                $right=$('#right'),
                $slider=$('#slider').get(0),
                $nav=$('#navs').children(),
                timer;

            //自动轮播
            timer=setInterval(nextPage,2000);
            //鼠标滑上显示箭头
            $box.mouseover(function(){
                clearInterval(timer);
                $left.css({
                    opacity:0.5
                })
                $right.css({
                    opacity:0.5
                })
            })
            //鼠标滑出不显示箭头
            $box.mouseout(function(){
                timer=setInterval(nextPage,2000);
                $left.css({
                    opacity:0
                })
                $right.css({
                    opacity:0
                })
            })
            
            //点击右箭头跳转到下一页
            $right.click(function(){
                nextPage();
            });
            //点击左箭头跳转到上一页
            $left.click(function(){
                lastPage();
            });
    
            var page=1;
            //跳转到下一页
            function nextPage(){
                page++;
                //下方导航切换
                navChange();
                //轮播动画
                animate({left:-1200*page},function(){
                    if(page===6){
                        $slider.style.left='-1200px';
                        page=1;
                    }
                });
            }
            //跳转到上一页
            function lastPage(){
                page--;
                //下方导航变换
                navChange();
                //轮播动画
                animate({left:-1200*page},function(){
                    if(page===0){
                        $slider.style.left='-6000px';
                        page=5;
                    }
                });
            }
            //下方导航变换事件
            function navChange(){
                for(var i=0;i<$nav.length;i++){
                    $nav[i].className="";
                }
                if(page<=0){
                    $nav[4].className="active";
                }else if(page>5){
                    $nav[0].className="active";
                }else{
                    $nav[page-1].className="active"
                }
            }
            //点击下方数字，跳转对应页面
            for(var i=0;i<$nav.length;i++){
                (function(i){
                    $($nav[i]).click(function(){
                        page=i+1;
                        navChange();
                        animate({left:-1200*page},null);
                    })
                })(i);
            }

            //获取当前left状态
            function getStyle(obj,attr){
                if(obj.currentStyle){
                    return obj.currentStyle[attr];
                }else{
                    return getComputedStyle(obj,false)[attr];
                }
            }
            //轮播事件
            function animate(style,callback){
                clearInterval($slider.timer);
                var timer=setInterval(function(){
                    var stop=true;
                    for(var left in style){
                        var old=parseInt(getStyle($slider,left));
                        var speed=(style[left]-old)/10;
                        if(speed>0){
                            speed=Math.ceil(speed);
                        }else{
                            speed=Math.floor(speed);
                        }
                        var news=old+speed;
                        $slider.style[left]=news+'px';
                        if(style[left]!==news){
                            stop=false;
                        }
                    }
                    if(stop){
                        clearInterval(timer);
                        callback&&callback();
                    }
                },25)
            }
                
        }
        return{
            show:show
        }
})();
