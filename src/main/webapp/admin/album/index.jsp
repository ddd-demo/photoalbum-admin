<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>user</title>
<script src="/photoalbum-admin/admin/commons/easyui1.5/jquery.min.js"></script>
<script
	src="/photoalbum-admin/admin/commons/easyui1.5/jquery.easyui.min.js"></script>
<link  rel="stylesheet" type="text/css"
	href="/photoalbum-admin/admin/commons/easyui1.5/themes/default/easyui.css">
<link  rel="stylesheet" type="text/css"
	href="/photoalbum-admin/admin/commons/easyui1.5/themes/icon.css">
<script type="text/javascript">
	function initDG() {
		var toolbar = [ "-", {
			id : 'btnAdd1',
			text : '新增1',
			iconCls : 'icon-add',
			handler : function() {

			}
		}];

		$("#dg1").datagrid({toolbar : toolbar});

	}
</script>
</head>

<body>
	<button onclick="initDG()">init DG</button>
	<table id="dg1"></table>
</body>
</html>