<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>user</title>
<jsp:include page="../commons/jsp/header_easyui.jsp" />
<script type="text/javascript">
	//alert(seajs);
	seajs.use("album/ts", function(am) {
		am.init();
	});
</script>
</head>

<body>
	<div>
		<button onclick="load1()">load dg1</button>
		<button onclick="load2()">load dg2</button>
	</div>
</body>
</html>