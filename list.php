<?php
    header("content-type:text/html;charset=utf-8");

    $conn = mysqli_connect('localhost','root','root','user');

    $sql = "SELECT * FROM `goods_list`";
    $res = mysqli_query($conn,$sql);


    $arr = mysqli_fetch_all($res,MYSQLI_ASSOC);

    echo json_encode($arr);

    mysqli_close($conn);



?>