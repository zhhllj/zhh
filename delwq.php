<?php
header('content-type:text/html;charset=utf8');

$id = $_REQUEST['id'];
$conn = mysqli_connect('localhost','root','root','user');
//根据id删除数据
$sql = "DELETE FROM `goods_shop` WHERE `id`=$id";
$result = mysqli_query($conn,$sql);
if($result){
	echo json_encode(array("code"=>1));
}else{
	echo json_encode(array("code"=>0));
}

?>