
//每一次发送ajax之前先清理一次localstorage里面的内存
// if(localStorage.getItem("k_name")){
//     localStorage.removeItem("k_name");
// }
// var goods_arr = JSON.parse(localStorage.getItem("k_name"))||[];
//         console.log(goods_arr)
$.ajax({

    url:'../showlist.php',
    method:'post',
    success:function(data){
        console.log(data);
        // var goods_arr = JSON.parse(localStorage.getItem("k_name"))||[];
        // console.log(goods_arr)
        // $.each(data.data,function(index,item){
        //     // console.log(item)
        //     // console.log(goods_arr)
        //         // var res = JSON.stringify(item);
        //         // console.log(res);
        //         goods_arr.push(item);
        //         // console.log(goods_arr);
        //         localStorage.setItem('k_name',JSON.stringify(goods_arr));
    
    
            
        // })
        // console.log(goods_arr);
        // localStorage.setItem('k_name',JSON.stringify(goods_arr));
        // 从localstorage里面取出数据
        // var res = localStorage.getItem('k_name');
        // console.log(res)
        // res = JSON.parse(res);
        
        var res = data.data;
        // console.log(res);
        var html = ``;
        $.each(res,function(index,item){
            // console.log(item)
            // var st = JSON.parse(item);
            var st = item;
            // console.log(st);
            
            html += `<div class="g_l_log">
                        <span class="id">${st.Id}</span>

                        <span class="input">
                            <input type="checkbox" class="inp2">
                        </span>
                        <a href="#" class="a1">
                            <img src=${st.src} alt="">
                        </a>
                        <span class="name">
                            <a href="#">${st.title}</a>
                        </span>
                        <span class="cm">M</span>
                        <span class="jz">￥${st.prise}</span>
                        <span class="sl">
                            <a href="javascript: ;" class="js"></a>
                            <input type="text" class="txt" value="${st.num}">
                            <a href="javascript: ;" class="zj"></a>              
                        </span>
                        <span class="yh">-</span>
                        <span class="xj">￥${(st.prise)*(st.num)}</span>
                        <span class="sc">
                            <a href="javascript: ;">删除</a>
                        </span>
                        <!-- 点击删除按钮弹出弹框 -->
                        <div class="alert">
                            <p class="a_txt">
                                确定要删除此商品吗？
                            </p>
                            <p class="btn">
                                <a href="javascript: ;" class="qd">确定</a>
                                <a href="javascript: ;" class="qx">取消</a>
                            </p>
                            <span></span>
                        </div>
                        </div>`;

                

        })
        $('.g_login').html(html);


        // 点击删除按钮弹出弹框
        // console.log($(".g_login .g_l_log .sc a"));
        $(".g_l_log .sc a").click(function(){
            
            $(this).parent().siblings('.alert').css('display','block');
            $(this).parent().parent().siblings().find(".alert").css('display','none');
        })
        $(".alert .btn .qx").click(function(){
            $(this).parent().parent().css('display','none');
        })
        $(".alert .btn .qd").click(function(){
            var n = $(this).parent().parent().siblings('.id').text();
            var _this = this;
            console.log(n)
            $.ajax({
                url:'../delwq.php',
                method:'post',
                data:{
                    id:n
                },
                success:function(data){
                    if(data.code==1){
                        console.log(1);
                        
                        $(_this).parents(".g_l_log").remove();
                    }
                    $.ajax({
                        url:'../showlist.php',
                        method:'post',
                        success:function(data){
                            if(data.code==0){
                                $('#cart').css('display','block');
                                $('#login').css('display','none');
                            }else{
                                $('#cart').css('display','none');
                                $('#login').css('display','block');
                            }
                        },
                        dataType:'json'
                    })
                    
                },
                dataType:'json'
                
            })
            
            // var n = $(this).parent().parent().siblings('.id').text();
            // console.log(n);
            // var data = localStorage.getItem("k_name");
            // data = JSON.parse(data);
            // for(var i=0;i<data.length;i++){
            //     item = data[i];
            //     console.log(item.Id)
            //     if(item.Id==n){
            //         data.splice(i,1);
            //         localStorage.setItem('k_name',JSON.stringify(data));
            //         break;
            //     }
            // }  
            
        })

        if(data.code==0){
            $('#cart').css('display','block');
            $('#login').css('display','none');
        }else{
            $('#cart').css('display','none');
            $('#login').css('display','block');
        }



        //价格数据渲染
        $('.sl .js').click(function(){
            var dj = $(this).parent().siblings('.jz').text();
            dj = dj.substr(1);
            // console.log(dj.substr(1))
            var _this = this;
            var id = $(this).parent().siblings('.id').text();
            // console.log(id)
            $.ajax({
                url:'../updatewq.php',
                data:{
                    type:'jian',
                    id:id
                },
                dataType:'json',
                success:function(data){
                    // console.log(data)
                    if(data.code==1){
                        // console.log(1)
                        var num = $( _this).siblings('.txt').val();
                        //    console.log(num)
                        num--;
                        $( _this).siblings('.txt').val(num);

                        // $('.g_l_log .jg').text()

                        $( _this).parent().siblings('.xj').text(`￥${num*dj}`);

                    }
                }
            })
        })

        
        $('.sl .zj').click(function(){
            var dj = $(this).parent().siblings('.jz').text();
            dj = dj.substr(1);
            var _this = this;
            var id = $(this).parent().siblings('.id').text();
            // console.log(id)
            $.ajax({
                url:'../updatewq.php',
                data:{
                    type:'add',
                    id:id
                },
                dataType:'json',
                success:function(data){
                    // console.log(data)
                    if(data.code==1){
                        // console.log(1)
                       var num = $( _this).siblings('.txt').val();
                    //    console.log(num)
                       num++;
                       $( _this).siblings('.txt').val(num);
                       
                       $( _this).parent().siblings('.xj').text(`￥${num*dj}`);
                    }
                }
            })
        })



        //全选单选功能
        //input的全选功能
        $('.inp1').change(function(){
            // console.log($('.inp1').prop("checked"))
            if($(this).prop("checked")){
                $('.inp2').prop("checked",true);
                $('.inp3').prop("checked",true);
            }else{
                $('.inp2').prop("checked",false);
                $('.inp3').prop("checked",false);
            }
            var arr = $('.inp2:checked');
            var num = 0;
            var sum = 0;
            $.each(arr,function(index,item){
                var num1= $(item).parent().siblings('.sl').children('.txt').val();
                num1 = parseInt(num1);
                num += num1;
                var sum1 = $(item).parent().siblings('.xj').text().substr(1);
                sum1 = parseInt(sum1);
                sum +=sum1
                return 
            })
            console.log(num,sum);
            $('.p_txt').find('em').text(num);
            $('.p_left').find('em').text(sum);
        })
        $('.inp3').change(function(){
            // console.log($('.inp1').prop("checked"))
            if($(this).prop("checked")){
                $('.inp2').prop("checked",true);
                $('.inp1').prop("checked",true);
            }else{
                $('.inp2').prop("checked",false);
                $('.inp1').prop("checked",false);
            }
            var arr = $('.inp2:checked');
            var num = 0;
            var sum = 0;
            $.each(arr,function(index,item){
                var num1= $(item).parent().siblings('.sl').children('.txt').val();
                num1 = parseInt(num1);
                num += num1;
                var sum1 = $(item).parent().siblings('.xj').text().substr(1);
                sum1 = parseInt(sum1);
                sum +=sum1
                return 
            })
            console.log(num,sum);
            $('.p_txt').find('em').text(num);
            $('.p_left').find('em').text(sum);
        })

        // input单选功能
        $('.inp2').change(function(){
            if($('.inp2:checked').length==($(".inp2").length)){
                $('.inp1').prop("checked",true);
                $('.inp3').prop("checked",true);
            }
            else{
                $('.inp1').prop("checked",false);
                $('.inp3').prop("checked",false);
            }


            var arr = $('.inp2:checked');
            var num = 0;
            var sum = 0;
            $.each(arr,function(index,item){
                var num1= $(item).parent().siblings('.sl').children('.txt').val();
                num1 = parseInt(num1);
                num += num1;
                var sum1 = $(item).parent().siblings('.xj').text().substr(1);
                sum1 = parseInt(sum1);
                sum +=sum1
                return 
            })
            console.log(num,sum);
            $('.p_txt').find('em').text(num);
            $('.p_left').find('em').text(sum);
        })


        
    },
    dataType:'json'
})





// var html = `<div class="g_l_log">
//             <span class="input">
//                 <input type="checkbox" checked class="inp2">
//             </span>
//             <a href="#" class="a1">
//                 <img src=${res.src} alt="">
//             </a>
//             <span class="name">
//                 <a href="#">${res.title}</a>
//             </span>
//             <span class="cm">M</span>
//             <span class="jz">￥${res.prise}</span>
//             <span class="sl">
//                 <a href="#" class="js"></a>
//                 <input type="text" class="txt" value="1">
//                 <a href="#" class="zj"></a>              
//             </span>
//             <span class="yh">-</span>
//             <span class="xj">￥${res.prise}</span>
//             <span class="sc">
//                 <a href="#">删除</a>
//             </span>
//             <!-- 点击删除按钮弹出弹框 -->
//             <div class="alert">
//                 <p class="a_txt">
//                     确定要删除此商品吗？
//                 </p>
//                 <p class="btn">
//                     <a href="#" class="qd">确定</a>
//                     <a href="#" class="qx">取消</a>
//                 </p>
//                 <span></span>
//             </div>
//             </div>`

//     $('.g_login').html(html);





// console.log($('.l_txt2>p>a'))
// 登录之后将用户名渲染上去
var user = getCookie("username");
// console.log(user);
if(user){
    $('.l_txt2>p').text(`您好,${user}`);
    // console.log($('.l_txt2>p'))
    $('.l_txt2>p').append('<a href="./enter.html">退出登录</a>');
    $('.l_txt2>p').append('<span>|</span>');
    $('.l_txt2>p').append('<a href="./login.html">更换用户</a>');
    
}
else{
    $('.l_txt2>p').innerText = `您好,欢迎光临凡客诚品！`;
    $('.l_txt2>p>a').text('登录');
    $('.l_txt2>p>a').text('注册');
    
}



// <!-- 点击删除按钮弹出弹框 -->
// console.log($(".g_login .g_l_log .sc a"));
// $(".g_l_log .sc a").click(function(){
    
//     $(this).parent().siblings('.alert').css('display','block');
//     $(this).parent().parent().siblings().find(".alert").css('display','none');
// })
// $(".alert .btn .qx").click(function(){
//     $(this).parent().parent().css('display','none');
// })
// $(".alert .btn .qd").click(function(){
//     $(this).parents(".g_l_log").remove();
// })