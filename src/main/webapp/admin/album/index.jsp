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
		$("#if1").src("main");
	}
	function load2() {
		$("#if2").src("main");
	}
</script>
</head>

<body>
	<div>
		<button onclick="load1()">load dg1</button>
		<button onclick="load2()">load dg2</button>
	</div>
	<iframe id="if1" src="main"
		style="width: 100%; height: 300px; border: 0;"></iframe>
	<iframe id="if2" src="main"
		style="width: 100%; height: 300px; border: 0;"></iframe>
</body>
</html>