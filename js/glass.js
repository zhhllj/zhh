// 放大镜功能

// 鼠标移入左侧小图片，右侧的放大镜小图片相应显示
//并且对应的边框变红，高亮
$(".fdj_left .l_img>li>span").mouseover(function(){
    //高亮小图片
    $(this).addClass('t1_on');
    $(this).parent().addClass('track_li');
    $(this).parent().siblings().removeClass('track_li')
    .children().removeClass('t1_on');

    // 相应的小图改变

    var num = $(this).parent('li').index()+1;
    $('#m_img').attr('src','./images/xt'+num+'.jpg')

    //相应的大图改变
    $('#d_img').attr('src','./images/dt'+num+'.jpg');
})


// 放大镜功能
//移入小图显示遮罩层和大图
$('.f_xiaotu .f_img').mouseover(function(){
    //遮罩层显示
    $(this).children('.zzc').css('display','block');
    


    // 放大图大图显示
    $(this).children('.f_datu').css('display','block');

})


//鼠标在小图中移动,遮罩层跟随
$('.f_xiaotu .f_img').mousemove(function(e){
    //定位遮罩层
    var left = e.pageX - $(this).offset().left;
    // console.log(left);
    var top = e.pageY - $(this).offset().top;
    // console.log(top);
    left = left-$('.zzc').innerWidth()/2;
    top = top-$('.zzc').innerHeight()/2;
    // console.log(left);
    // console.log(top);
    if(left<0){
        left=0;
    }
    if(left>$('.f_img').innerWidth()-$('.zzc').innerWidth()){
        left = $('.f_img').innerWidth()-$('.zzc').innerWidth();
    }
    if(top<0){
        top=0;
    }
    if(top>$('.f_img').innerHeight()-$('.zzc').innerHeight()){
        top = $('.f_img').innerHeight()-$('.zzc').innerHeight();
    }
    $('.zzc').css({
        'left':left+'px',
        'top':top+'px'
    })


    // 相应的大图改变
    var x = -left/$('#m_img').innerWidth()*$('#d_img').innerWidth();
    var y = -top/$('#m_img').innerHeight()*$('#d_img').innerHeight();
    $('#d_img').css({
        'left':x+'px',
        'top':y+'px'
    })
})



//移出小图隐藏遮罩层和大图
$('.f_xiaotu .f_img').mouseout(function(){
    //遮罩层隐藏
    $(this).children('.zzc').css('display','none');
    // 放大图大图隐藏
    $(this).children('.f_datu').css('display','none');

})




// 颜色选择边框高亮

$('.ys_img>ul>li').click(function(){
    $(this).addClass('on').siblings().removeClass('on');
    $(this).append('<em class="on_e"></em>').siblings().children('.on_e').remove();

})

//点击尺码选择边框高亮
$('.cm_ms>ul>li').click(function(){
    $(this).addClass('on').siblings().removeClass('on');
    $(this).append('<em class="on_e"></em>').siblings().children('.on_e').remove();
})


// 点击加入购物车,获取商品ID存入localstorage

    // 从地址栏获取地址
    var id = location.href;
    // 截取地址栏的ID
    id = id.split('=')[1];
    console.log(id)
    // var num = $('#selected option').change(function(){
    //     return ($(this).html());
    // })
    // var num = $('#selected').val();
    // // console.log(num)
    // $('#selected').change(function(){
    //     num = this.value;
    //     // console.log(num);
    // })
    

    // console.log(id);
    //发送ajax请求,获取后台传入的数据
    $('.main_login .login_a2').click(function(){
        $.ajax({
            method:'post',
            url:'../list.php',
            success:function(data){
                // console.log(num);
                // console.log(data);
                
                    // var str = JSON.parse(localStorage.getItem('shop'))||[];
                    $.each(data,function(index,item){
                        console.log(item.Id);
                        if(item.Id==id){ 
                            console.log(item);
                            $.ajax({
                                method:'post',
                                url:'../addwq.php',
                                data:{
                                    id:item.Id,
                                    title:item.title,
                                    src:item.src,
                                    prise:item.prise,
                                    num:$('#selected').val()
                                },
                                dataType:'json',
                                success:function(){
                                    location.href = '../shop.html';
                                }
                            })                           
                    }
                })
            
            },
            dataType:'json'
        })
        
    })


