<?php


$conn = mysqli_connect('localhost','root','root','user');

//书写sql语句
$sql = "SELECT * FROM `goods_shop`";

//执行sql语句
$result = mysqli_query($conn,$sql);
if(mysqli_num_rows($result)>0){	
	$arr = mysqli_fetch_all($result,MYSQL_ASSOC);
	echo json_encode(array("code"=>1,"data"=>$arr));
}else{	
	echo json_encode(array("code"=>0));
}


?>