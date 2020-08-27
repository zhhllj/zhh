<?php

header("content-type:text/html;charset=utf8");

$conn = mysqli_connect('localhost','root','root','user');

$id = $_REQUEST['id'];
$type = $_REQUEST['type'];

$sql = "SELECT * FROM `goods_shop` WHERE `id`='$id'";
$res = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($res);
$num = $row['num'];
if($type=='add'){	
	$num = $num+1;
	$sql = "UPDATE `goods_shop` SET `num`='$num' WHERE `id`='$id'";
}else{
	$num = $num-1;
	if($num>0){
		$sql = "UPDATE `goods_shop` SET `num`='$num' WHERE `id`='$id'";
	}
}

$result = mysqli_query($conn,$sql);
if($result){
	echo json_encode(array("code"=>1));
}else{
	echo json_encode(array("code"=>0));
}
?>