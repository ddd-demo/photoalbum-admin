<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>user</title>
<jsp:include page="../commons/jsp/header_easyui.jsp" />

<script type="text/javascript" src="${webBase}album.js"></script>

<script type="text/javascript">
	
</script>
</head>

<body class="easyui-layout" data-options="border:false">
	<!-- footer:'#userFt', -->
	<table id="datagridId"></table>
	<div id="toolbarId">
		<table cellspacing="0" cellpadding="0">
			<tr>
				<td><a id="showInputWinBut" href="#" class="easyui-linkbutton"
					iconCls="icon-add" plain="true">增加</a></td>
				<td>
					<div class="datagrid-btn-separator"></div>
				</td>
				<td><a id="showEditWinBut" href="#" class="easyui-linkbutton"
					iconCls="icon-edit" plain="true"
					onclick="albumService.showEidtWin()">编辑</a></td>
				<td>
					<div class="datagrid-btn-separator"></div>
				</td>
				<td><a id="showViewWinBut" href="#" class="easyui-linkbutton"
					iconCls="icon-save" plain="true" onclick="albumService.doSave()">详情</a></td>
				<td>
					<div class="datagrid-btn-separator"></div>
				</td>
				<td><a id="deleteBut" href="#" class="easyui-linkbutton"
					iconCls="icon-remove" plain="true"
					onclick="albumService.doDelete()">删除</a></td>
			</tr>
		</table>
		<div class="datagrid-toolbar"></div>
		<div id="search_div" style="padding: 2px 5px;">
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
	</div>

	<!-- input form page -->
	<div id="inputWinId" class="easyui-dialog" title="录入相册信息"
		style="width: 400px; hight: 500px; padding: 10px">
		<div class="easyui-layout">
			<form id="inputFormId" method="post">
				<div style="margin-bottom: 20px">
					<input class="easyui-textbox" name="name" style="width: 100%"
						data-options="label:'相册名称:',required:true">
				</div>
				<div style="margin-bottom: 20px">
					<input class="easyui-textbox" name=number style="width: 100%"
						data-options="label:'相册排序:',required:true" value="2">
				</div>
				<div style="margin-bottom: 20px">
					<input class="easyui-textbox" name="description"
						style="width: 100%; height: 60px"
						data-options="label:'相册描述:',multiline:true">
				</div>
			</form>
		</div>
	</div>
</body>
</html>