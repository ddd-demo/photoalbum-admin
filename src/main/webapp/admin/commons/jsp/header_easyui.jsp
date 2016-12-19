<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<c:set var="webBase" value="${pageContext.request.contextPath}/admin/" />
<META HTTP-EQUIV="pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-store, must-revalidate">
<META HTTP-EQUIV="expires" CONTENT="Wed, 26 Feb 1997 08:21:57 GMT">
<META HTTP-EQUIV="expires" CONTENT="0">
<link rel="stylesheet" type="text/css"
	href="${webBase}easyui1.5/themes/default/easyui.css">
<link rel="stylesheet" type="text/css"
	href="${webBase}easyui1.5/themes/icon.css">
<link rel="stylesheet" type="text/css"
	href="${webBase}easyui1.5/demo/demo.css">
<script type="text/javascript" src="${webBase}easyui1.5/jquery.min.js"></script>
<script type="text/javascript"
	src="${webBase}easyui1.5/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${webBase}commons/js/date.js"></script>
<script type="text/javascript" src="${webBase}commons/js/main.js"></script>
<script type="text/javascript">
	var WebCommon = {
		webBase : '${webBase}',
		getWebPath : function(moduleUri) {
			return this.webBase + moduleUri;
		},
		doSave : function(formInfo) {
			var url = formInfo.url;
			var formId = formInfo.formId;
			var handler = formInfo.handler;
			var data = $(formId).serialize();
			url = WebCommon.getWebPath(url);
			$.ajax({
				url : url,
				type : "post",
				dataType : "json",
				data : data,
				success : function(data) {
					handler.callback(data)
				},
				error : function(xrequest, textStatus, errorThrown) {
					$.messager.alert('系统提示:', '请求失败！错误:'
							+ xrequest.responseText, 'error');
				}
			});
		},
		doDelete : function(delInfo) {
			// datagrid, keyName, delUrl, callback
			var row = $(delInfo.datagrid).datagrid('getSelected');
			if (row) {
				$.messager.confirm('删除提示', '你确认删除选中的记录吗?', function(r) {
					if (r) {
						var keyValue = row[delInfo.keyName];
						if (!keyValue) {
							$.messager.alert('删除提示', '没有唯一标示的ID，请检查唯一标示的字段名称!',
									'warning');
						}
						var url = WebCommon.getWebPath(delInfo.url) + "?"
								+ delInfo.keyName + "=" + keyValue
						$.ajax({
							url : url,
							success : delInfo.hardler.callback
						})
					}
				});
			} else {
				$.messager.alert('删除提示', '至少选择一条记录后才能删除!', 'warning');
			}
		}

	}
</script>