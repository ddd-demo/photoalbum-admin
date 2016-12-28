<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>user</title>
<script type="text/javascript"
	src="/photoalbum-admin/admin/commons/easyui1.5/jquery.min.js"></script>

<script type="text/javascript">
	$(function() {
		$("#myinput").attr("name","password");
		$("#myinput").attr("id","id111");
		$("#111").attr("id","d111");
		//alert($("#diva #p1").text());
	});
	function test1() {
		alert($("input[name='userName']").val());
		//$("div").first().css("color", "red")
	}
</script>
</head>

<body>

	<input id="myinput" name="userName">
	<button onclick="test1()">test</button>
	<div id="111">
	22
	</div>
</body>
</html>