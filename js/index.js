// 顶部top微信图片显示和隐藏
var topImg = document.querySelector('.top_img');
var a1Img = topImg.children[0];
var a1ImgS = document.querySelector('.a1_img_s');
a1Img.onmouseenter = function(){
    a1ImgS.style.display = 'block';
}
a1Img.onmouseleave = function(){
    a1ImgS.style.display='none';
}

// 头部header的购物车的显示和隐藏
var login = document.querySelector('.login');
var loginS = document.querySelector(".login_s");
var loginA = login.children[0].children[0];
var login_ = login.children[1];
login.onmouseenter = function(){
    login.style.background = "url(./images/vanclsprite.png) no-repeat scroll -154px -29px";
    loginA.style.color = '#c1383e';
    loginS.style.display = 'block';
    login_.style.display = 'block';
}
login.onmouseleave = function(){
    login.style.background = "url(./images/vanclsprite.png) no-repeat scroll -154px 0";
    loginA.style.color = '#fff';
    loginS.style.display = 'none';
    login_.style.display = 'none';
}

// 导航的列表显示和隐藏
// var nav = document.querySelector('.nav');
// var liS = nav.children[0].children;

// for(var i=1;i<liS.length;i++){
//     liS[i].onmouseenter = function(){
//         this.children[2].style.display = 'block';
//     }
//     liS[i].onmouseleave = function(){
//         this.children[2].style.display = 'none';
//     }
// }


$('.ul>li').mouseover(function(){
    $(this).children('ul').stop().slideDown();
    $(this).siblings().children('ul').stop().slideUp();
    $('.ul>li').mouseleave(function(){
    $(this).children('ul').stop().slideUp();
    })
})


//banner轮播图

    //获取相关元素
    var slider = document.querySelector('.slider-ctrl');
    var prev = slider.children[0];//左箭头
    var next = slider.children[1];//右箭头
    // var span = slider.children[2].children;//小圆点集合
    var banner = document.querySelector('.banner_inner');//容器
    var liS = banner.children[0].children;//图片的集合
    var width = banner.offsetWidth;//容器的宽度
    var timer = null;//定时器变量

    //  用一个变量记录当前是第几个li
    var index = 0;

    // 1 默认显示第一张图片,其他图片都放到右边
    for(var i=0;i<liS.length;i++){
        //  先把所有的li放到最右边
        liS[i].style.left = width + 'px';
        // 2 根据图片数量生产小圆点
        var span = document.createElement('span');
        // 把小圆点的索引记录在小圆点的innerHTML里面
        span.innerHTML = i;
        span.className = 'slider-ctrl-con';//给小圆点添加类名
        slider.children[2].appendChild(span);
        span.style.color = 'transparent';
    }
    liS[index].style.left = 0;
    light();


    //利用事件冒泡原理,把prev,next和小圆点上的事件都委托给ctrlContainer
    slider.onclick = function(e){
        e = window.event||e;
        var target = e.target||e.srcElement;
        if(target.className == 'prev'){
            // 5 点击prev看上一张图
            var newIndex = index - 1;
            if(newIndex<0){
                newIndex = liS.length-1;
            }
            // 我要看的图必须在左边
            liS[newIndex].style.left = -width +'px';
            // 原来的图去右边
            animation(liS[index],{left:width});
            // 要看的图来中间
            animation(liS[newIndex],{left:0});
            //更新当前索引
            index = newIndex;
            light();
        }else if(target.className == 'next'){
            nextImg();
        }
    }
    slider.onmouseover = function(e){
        e = window.event||e;
        var target = e.target||e.srcElement;
        // str.indexOf('a'):就是查找a在str里面的索引,如果找不到返回-1,如果找到了返回索引
        if(target.className.indexOf("slider-ctrl-con")>-1){
            // 6 点击小圆点,看对应的图
            var newIndex = parseInt(target.innerHTML);//target.innerHTML获取出来是字符串格式;
            console.log(newIndex);
            if(newIndex<index){
                //如果要看的图索引比当前小,那要看的图必须在左边
                
                liS[newIndex].style.left = -width +'px';
                animation(liS[index],{left:width});
                animation(liS[newIndex],{left:0});
            }
            else if(newIndex>index){
                //如果要看的图索引比当前大,那要看的图必须在右边
                liS[newIndex].style.left = width +'px';
                animation(liS[index],{left:-width});
                animation(liS[newIndex],{left:0});
            }
            index = newIndex;
            light();
        }
    }
    timer=setInterval(nextImg,2000);
    // 8 鼠标移入轮播图,停止轮播
    banner.onmouseenter=function(){
        clearInterval(timer);
    }
    // 9 鼠标移出轮播图,开启轮播
    banner.onmouseleave=function(){             
        //要用定时器先清定时
        clearInterval(timer);
        timer = setInterval(nextImg,2000);
    }




    //3 第一个小圆点高亮(当前图片对应的小圆点高亮)的函数
    function light(){
        var spanS =  slider.children[2].children;
        for(var i=0;i<spanS.length;i++){
            spanS[i].className = 'slider-ctrl-con';
        }
        //只有当前图片对应的小圆点类名不同
        spanS[index].className = 'slider-ctrl-con current';
    }




    //功能:显示当前index的下一张
    function nextImg(){
        var newIndex = index + 1;
        if(newIndex>liS.length-1){
            newIndex = 0;
        }
        liS[newIndex].style.left = width + 'px';//我要看的图必在右边
        animation(liS[index],{left:-width})//原来的图去左边
        animation(liS[newIndex],{left:0});//要看的图来中间
        //更新当前索引
        index = newIndex;
        //点亮小圆点
        light();    
    }



    //秒杀功能

    //获取相关元素
    var sSeckill = document.querySelector('.s_seckill');
    var em = sSeckill.children[0];
    var s1 = sSeckill.children[1];
    var s2 = sSeckill.children[3];
    var s3 = sSeckill.children[5];
    var time = null;

    
    function li(){
        
        var date1 = new Date();
        var date2 = new Date("2020-8-18 17:00:00");
        date1 = date1.getTime();
        date2 = date2.getTime();
        var s =(date2-date1)*1000;

        var hours = parseInt((date2-date1)/(1000*60*60));
        var minutes = parseInt((date2-date1)%(1000*60*60)/(1000*60));
        var seconds = parseInt((date2-date1)%(1000*60*60)%(1000*60)/1000);
        if(s<0){
            em.innerHTML = '该活动已结束';
            return;
        }
        if(hours<10){
            hours = '0'+hours;
        }
        
        if(minutes<10){
            minutes = '0'+minutes;
        }
        
        if(seconds<10){
            seconds = '0'+seconds;
        }
        s1.innerHTML = hours;
        s2.innerHTML = minutes;
        s3.innerHTML = seconds;
        if(hours=="00"&&minutes=="00"&&seconds=="00"){
            em.innerHTML = '该活动已结束';
            clearInterval(time);
            return;
        }

        
    }
    li();
    clearInterval(time);
    time = setInterval(li,1000)   
    
    

// 登录之后将用户名渲染上去
var user = getCookie("username");
console.log(user);
if(user){
    $('.top_inner>p').text(`您好,${user}`);
    $('.top_inner>span>a').eq(0).text('退出登录');
    $('.top_inner>span>a').eq(1).text('更换用户');
    $('.top_inner>span').addClass('span');
    $('.top_inner>span>a').addClass('spana');
}else{
    $('.top_inner>p').text(`您好,欢迎光临凡客诚品！`);
    $('.top_inner>span>a').eq(0).text('登录');
    $('.top_inner>span>a').eq(1).text('注册');
    $('.top_inner>span').removeClass('span');
    $('.top_inner>span>a').removeClass('spana');
}
