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
	
	});
	function load1() {
		$("#div1").load("main");
	}
	function load2() {
		$("#div2").load("main");
	}
</script>
</head>

<body>
	<div>
		<button onclick="load1()">load dg1</button><button onclick="load2()">load dg2</button>
	</div>
	<div id="div1" style="height: 300px">11</div>
	<div id="div2" style="height: 400px">22</div>
</body>
</html>