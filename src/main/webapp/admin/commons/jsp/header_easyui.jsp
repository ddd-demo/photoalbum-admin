<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set var="webBase" value="${pageContext.request.contextPath}/admin/" />
<META HTTP-EQUIV="pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-store, must-revalidate">
<META HTTP-EQUIV="expires" CONTENT="Wed, 26 Feb 1997 08:21:57 GMT">
<META HTTP-EQUIV="expires" CONTENT="0">
<link rel="stylesheet" type="text/css"
	href="${webBase}commons/easyui1.5/themes/default/easyui.css">
<link rel="stylesheet" type="text/css"
	href="${webBase}commons/easyui1.5/themes/icon.css">
<link rel="stylesheet" type="text/css"
	href="${webBase}commons/easyui1.5/demo/demo.css">
<script type="text/javascript"
	src="${webBase}commons/easyui1.5/jquery.min.js"></script>
<script type="text/javascript"
	src="${webBase}commons/easyui1.5/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${webBase}commons/js/angular.min.js"></script>
<script type="text/javascript" src="${webBase}commons/js/date.js"></script>
<script type="text/javascript" src="${webBase}commons/js/main.js"></script>
<script type="text/javascript">
	var WebCommon = {
		webBase : '${webBase}',
		getWebPath : function(moduleUri) {
			return this.webBase + moduleUri;
		}
	}
</script>