<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>user</title>
<jsp:include page="../commons/jsp/header_easyui.jsp" />


<script type="text/javascript">
	$(function() {
		var tbs = [ {
			id : 'btnRefresh',
			text : '刷新',
			iconCls : 'icon-reload',
			handler : function() {

			}
		} ];
		$("#datagridId").datagrid({toolbar:tbs});
		$("#find-div").appendTo(".datagrid-toolbar");
	})
</script>
</head>

<body class="easyui-layout" data-options="border:false">
	<!-- footer:'#userFt', -->
	<table id="datagridId"></table>
	<!-- 查询form -->
	<div id="find-div" style="padding: 2px 5px;">
		<form id="findForm">
			<table cellspacing="0" cellpadding="0">
				<tr>
					<td>日期: <input name="beginDate" class="easyui-datebox"
						style="width: 110px"></td>
					<td>至: <input name="endDate" class="easyui-datebox"
						style="width: 110px"></td>
					<td><a href="#" class="easyui-linkbutton"
						iconCls="icon-search">查询</a></td>
				</tr>
			</table>
		</form>
	</div>

</body>
</html>