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
	function test1(divt) {
		alert($(divt).children("#div1").text());
		alert($(divt).children("#div2").text());
	}
</script>
</head>

<body>
	<div onclick="test1(this)">
		<div id="div1">1111</div>
		
		<div id="div2"></div>
	</div>
	
</body>
</html>