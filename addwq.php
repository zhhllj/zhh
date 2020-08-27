<?php

header('content-type:text/html;charset=utf8');


//获取前端的参数
$id = $_REQUEST['id'];//商品id
$title = $_REQUEST['title'];//商品title
$src = $_REQUEST['src'];//商品img
$prise = $_REQUEST['prise'];//商品prise
$num = $_REQUEST['num'];//商品数量

$conn = mysqli_connect('localhost','root','root','user');
//根据前端参数插入数据
$sql = "SELECT * FROM `goods_shop` WHERE `id`='$id'";
$res = mysqli_query($conn,$sql);
$rows = mysqli_num_rows($res);//mysql_num_rows方法是统计查询结果有几行
if($rows>0){
	$row = mysqli_fetch_assoc($res);//获取当前行数据,转成php数组
	$num = $row['num']+$num;
	$sql = "UPDATE `goods_shop` SET `num`='$num' WHERE `id`='$id'";
}else{
	$sql = "INSERT INTO `goods_shop` (`id`,`src`,`title`,`num`,`prise`) VALUES ('$id','$src','$title','$num','$prise')";
}

$result = mysqli_query($conn,$sql);
if($result){
	echo json_encode(array("code"=>1));
}else{
	echo json_encode(array("code"=>0));
}

?>