// 注册登录功能

(function(){
    //验证用户名函数
    function username(){
        var nValue = $('.yzm .y_txt').val();
        var name = /^[a-zA-Z0-9_]{4,9}$/;//4到9位数字字母下划线
        if(name.test(nValue)){
            $('.txt1').html('该用户名可以注册');
            return true;
        }else{
            $('.txt1').html('该用户名不可用,请重新输入');
            return false;
        }
    }
    $('.y_txt').keyup(function(){
        username();
    })
    //验证手机号函数
    function dianhua(){
        var sValue = $('.s_txt').val();
        console.log(sValue);
        var sj =/^1(3|4|5|6|7|8|9)\d{9}$/;
        if(sj.test(sValue)){
            $('.txt2').html('手机号正确');
            return true;
        }else{
            $('.txt2').html('请输入正确的手机号');
            return false;
        }
    }
    $('.s_txt').keyup(function(){
        dianhua();
    })

    
    //验证密码函数
    function password(){
        var mValue = $('.m_txt').val();
        
        var mima =  /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
        if(mima.test(mValue)){
            $('.txt3').html('密码强度高,可以设置');
            return true;
        }else{
            $('.txt3').html('密码强度过低,请重新设置');
            return false;
        }
    }
    $('.m_txt').keyup(function(){
        password();
    })
    //再次输入密码函数
    function pWord(){
        var mValue = $('.m_txt').val();
        console.log($('.m_txt').val())
        var msValue = $('.ms_txt').val();
        console.log(msValue);
        if(mValue==msValue){
            $('.txt4').html('两次密码相同,可以注册了');
            return true;
        }else{
            $('.txt4').html('两次密码不一致,请重新输入');
            return false;
        }
    }
    $('.ms_txt').keyup(function(){
        pWord();
    })
   
    // 验证正则发送ajax请求数据
    $('.st').click(function(){
        if(username()&&dianhua()&&password()&&pWord()){
            
            $.ajax({
                method:'post',
                url:'../login.php',
                data:{
                    username:$('.y_txt').val(),
                    password:$('.m_txt').val(),
                    dianhua:$('.s_txt').val()
                },
                success:function(data){
                    // console.log(data);
                    if(data.code==1){
                        //表示成功,跳转到登陆页面
                        alert("注册成功");
                        setTimeout(function(){
                            location.href = "../enter.html";
                        },1000)
                    }else{
                        alert(data.msg);
                    }
                },
                dataType:'json'
            })
        }
    })
})()



// function username(){
//     var nValue = $('.yzm .y_txt').val();
//     var name = /^[a-zA-Z0-9_]{4,9}$/;//4到9位数字字母下划线
//     if(name.test(nValue)){
//         $('.txt1').html('该用户名可以注册');
//         return true;
//     }else{
//         $('.txt1').html('该用户名不可用,请重新输入');
//         return false;
//     }
// }
// $('.st').click(function(){
//     var n =username();
//     console.log(n);
// })
