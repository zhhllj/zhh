// 价格区间的显示和隐藏
$(".inp_a input").focus(function(){
    $('.inp_b').css('display','block');
    $(this).css('outline','solid 1.5px #999');
    $(this).siblings('input').css('outline','none');
})
$('html').click(function(){
    $(".inp_b").css('display','none');
    $(".inp_a input").css('outline','none')
})

// 阻止点击事件冒泡
$(".inp_inner").click(function(){
    event.stopPropagation();
})

// 点击清空按钮清空input中内容
$('.inp_b .p_qx').click(function(){
    $(".inp_a input").val('');
})





// 价格的nav显示隐藏
$('.jiage').mouseover(function(){
    $(this).children('.jiage_nav').css('display','block');
})
$('.jiage').mouseout(function(){
    $(this).children('.jiage_nav').css('display','none');
})


// 渲染数据

// jquery发送ajax请求

$.ajax({
    url:'../list.php',
    dataType:'json'
})
.then(res=>{
    // console.log(res);
    var liHtml= '';
    res.forEach(item=>{
        // console.log(item);
        liHtml += `<li>
            <div class="l_img">
                <a href="../glass.html?id=${item.Id}">
                    <img src=${item.src}>
                </a>
                <div class="new"></div>
            </div>
            <p>
                <a href="#">${item.title}</a>
            </p>
            <div class="l_txt">
                售价￥${item.prise}
            </div>
            </li>`;
        
    })
    $('.list_img ul').html(liHtml);
})


// console.log('top:'+$('.list').offset().top)
// 浏览器滚动事件
$(window).scroll(function(){
    var h = $(this).scrollTop();
    // console.log('h:'+h);
    
    var top = 352;
    var height = $('.list').innerHeight();
    // console.log(height);
    if(h>=top){
        $('.list').addClass('fixed');
        $('.kb').css('margin-top',(height)+'px');

    }else{
        $('.list').removeClass('fixed');
        $('.kb').css('margin-top',0);

    }
})


// 返回顶部功能
$(window).scroll(function(){
    var hTop = $(this).scrollTop();
    // console.log(hTop);
    if(hTop>=100){
        $('.return').fadeIn();
    }else{
        $('.return').fadeOut();
    }
})
$('.return').click(function(){
    $(window).scrollTop(0);
})