<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>user</title>
<jsp:include page="../commons/jsp/header_easyui.jsp" />
<script type="text/javascript" src="album.js"></script>
<script type="text/javascript">
	
</script>
</head>

<body class="easyui-layout" data-options="border:false">
	<!-- footer:'#userFt', -->
	<table id="albumDatagrid"></table>
	<div id="toolbar">
		<table cellspacing="0" cellpadding="0">
			<tr>
				<td><a href="#" class="easyui-linkbutton" iconCls="icon-add"
					plain="true" onclick="album.showInputWin()">增加</a></td>
				<td>
					<div class="datagrid-btn-separator"></div>
				</td>
				<td><a href="#" class="easyui-linkbutton" iconCls="icon-edit"
					plain="true" onclick="album.showEidtWin()">编辑</a></td>
				<td>
					<div class="datagrid-btn-separator"></div>
				</td>
				<td><a href="#" class="easyui-linkbutton" iconCls="icon-save"
					plain="true" onclick="album.doSave()">保存</a></td>
				<td>
					<div class="datagrid-btn-separator"></div>
				</td>
				<td><a href="#" class="easyui-linkbutton" iconCls="icon-remove"
					plain="true" onclick="album.doDelete()">删除</a></td>
			</tr>
		</table>
		<div class="datagrid-toolbar"></div>
		<div id="search_div" style="padding: 2px 5px;">
			<table cellspacing="0" cellpadding="0">
				<tr>
					<td>日期: <input class="easyui-datebox" style="width: 110px"></td>
					<td>至: <input class="easyui-datebox" style="width: 110px"></td>
					<td><a href="#" class="easyui-linkbutton"
						iconCls="icon-search">查询</a></td>
				</tr>
			</table>
		</div>
	</div>

	<!-- input form page -->
	<div id="inputAlbumWin" class="easyui-dialog" title="录入相册信息"
		style="width: 400px; padding: 10px"
		data-options="
				closed:true,
				iconCls: 'icon-save',
				toolbar: [{
					text:'新增',
					iconCls:'icon-add',
					handler:function(){
						$('#albumForm').form('clear');
					}
				},'-',{
					text:'保存',
					iconCls:'icon-save',
					handler:function(){
						album.doSave();
					}
				}],
				buttons: [{
					text:'保存',
					handler:function(){
						album.doSave();
					}
				},{
					text:'关闭',
					handler:function(){
						$('#inputAlbumWin').dialog('close')
					}
				}]
			">
		<div class="easyui-layout">
			<form id="albumForm" method="post">
				<div style="margin-bottom: 20px">
					<input class="easyui-textbox" name="name" style="width: 100%"
						data-options="label:'相册名称:',required:true">
				</div>
				<div style="margin-bottom: 20px">
					<input class="easyui-textbox" name=number style="width: 100%"
						data-options="label:'相册排序:',required:true">
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