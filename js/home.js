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
