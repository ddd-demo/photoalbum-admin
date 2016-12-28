<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>user</title>
<jsp:include page="../commons/jsp/header_easyui.jsp" />
<!-- 本模块的脚本文件 -->
<script type="text/javascript" src="${webBase}album.js"></script>
<script type="text/javascript">
	$(function() {
		new AlbumView(${VIEW_JSON}).find();
	});
</script>
</head>

<body class="easyui-layout" data-options="border:false">
	<table id="${DATAGRID_ID_H}"></table>
	<!--find form -->
	<div id="${FIND_DIALOG_ID_H}">
		<div style="padding: 2px 5px;">
			<form id="${FIND_FORM_ID_H}">
				<table cellspacing="0" cellpadding="0">
					<tr>
						<td>日期: <input name="beginDate" class="easyui-datebox"
							style="width: 110px"></td>
						<td>至: <input name="endDate" class="easyui-datebox"
							style="width: 110px"></td>
						<td><a href="#" class="easyui-linkbutton"
							iconCls="icon-search" onclick="show1() ">查询</a></td>
					</tr>
				</table>
			</form>
		</div>
	</div>
	<!-- input dialog -->
	<div id="${INPUT_DIALOG_ID_H}" class="easyui-dialog" title="录入相册信息"
		style="width: 400px; hight: 500px; padding: 10px">
		<form id="${INPUT_FORM_ID_H}">
			<input name="id" type="hidden">
			<div style="margin-bottom: 20px">
				<input class="easyui-textbox" name="name" style="width: 90%"
					data-options="label:'相册名称:',required:true">
			</div>
			<div style="margin-bottom: 20px">
				<input class="easyui-textbox" name=number style="width: 90%"
					data-options="label:'相册排序:',required:true">
			</div>
			<div style="margin-bottom: 20px">
				<input class="easyui-textbox" name="description"
					style="width: 90%; height: 60px"
					data-options="label:'相册描述:',multiline:true">
			</div>
		</form>
	</div>
	<!-- edit dialog -->
	<div id="${EDIT_DIALOG_ID_H}" class="easyui-dialog" title="编辑相册信息"
		style="width: 400px; hight: 500px; padding: 10px">
		<form id="${EDIT_FORM_ID_H}">
			<input name="id" type="hidden">
			<div style="margin-bottom: 20px">
				<input class="easyui-textbox" name="name" style="width: 90%"
					data-options="label:'相册名称:',required:true">
			</div>
			<div style="margin-bottom: 20px">
				<input class="easyui-textbox" name=number style="width: 90%"
					data-options="label:'相册排序:',required:true">
			</div>
			<div style="margin-bottom: 20px">
				<input class="easyui-textbox" name="description"
					style="width: 90%; height: 60px"
					data-options="label:'相册描述:',multiline:true">
			</div>
		</form>
	</div>
	<!-- view dialog -->
	<div id="${VIEW_DIALOG_ID_H}" class="easyui-dialog" title="相册信息"
		style="width: 400px; hight: 500px; padding: 10px">
		<form id="${VIEW_FORM_ID_H }">
			<table>
				<tr>
					<td>相册名称</td>
					<td><label name="name"></label></td>
				</tr>
				<tr>
					<td>相册排序:</td>
					<td><label name="number"></label></td>
				</tr>
				<tr>
					<td>相册描述</td>
					<td><label name="description"></label></td>
				</tr>
			</table>
		</form>
	</div>
</body>
</html>