<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set var="webBase" value="${pageContext.request.contextPath}/admin/"
	scope="session" />
<META HTTP-EQUIV="pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-store, must-revalidate">
<META HTTP-EQUIV="expires" CONTENT="Wed, 26 Feb 1997 08:21:57 GMT">
<META HTTP-EQUIV="expires" CONTENT="0">
<script src="${webBase}commons/easyui1.5/jquery.min.js"></script>
<script src="${webBase}commons/easyui1.5/jquery.easyui.min.js"></script>
<script src="${webBase}commons/js/sea/sea.js"></script>
<script type="text/javascript">
	var WebCommon = {
		webBase : '${webBase}',
		getWebPath : function(moduleUri) {
			return this.webBase + moduleUri;
		}
	}
	seajs.config({
		base : "${webBase}",
		alias : {
			"jquery" : "commons/easyui1.5/jquery.min.js",
			"easyui-js" : "commons/easyui1.5/jquery.easyui.min.js",
			"datetools" : "ommons/js/date_tools.js",
			"admin-tool" : "commons/js/admin-tool.js"
		}
	});
	seajs.use("commons/easyui1.5/themes/default/easyui.css");
	seajs.use("commons/easyui1.5/themes/icon.css");
	seajs.use("commons/easyui1.5/demo/demo.css");
	//seajs.use("commons/easyui1.5/jquery.min.js");
</script>