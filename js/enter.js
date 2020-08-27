(function(){
    $(".login_a .st").click(function(){
        $.ajax({
            method:'post',
            url:'../enter.php',
            data:{
                username:$('.login_s .txt').val(),
                password:$('.login_s .pw').val()
            },
            success:function(data){
               if(data.code==1){
                    //表示成功
                    //把用户名存入本地存储
                    localStorage.setItem('username',data.data.username);
                    setCookie('username',data.data.username,7);
                    alert('登录成功,欢迎您'+data.data.username);
                    setTimeout(function(){
                        location.href = '../shop.html';
                    },1000);
                }else{
                    alert(data.msg);
                }
            },
            dataType:'json'
        })
    })
})()