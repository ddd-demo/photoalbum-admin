<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>user</title>
<jsp:include page="../commons/jsp/header_easyui.jsp" />
<script type="text/javascript">
	function load1(){
		//$("#f1").attr("src","main");
		$("#f1").load("main");
	}
	function load2(){
		//$("#f2").attr("src","main");
		$("#f2").load("main");
	}
</script>
</head>

<body>
	<div>
		<button onclick="load1()">load dg1</button>
		<button onclick="load2()">load dg2</button>
	</div>
	<div id="f1" style="height: 300px;width: 100%"  ></div>
	<div id="f2" style="height: 300px;width: 100%"  ></div>
</body>
</html>