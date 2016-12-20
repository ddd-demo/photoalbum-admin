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
	function AlbumView() {
		//输入窗口
		this.inputWin = {
			inputWinId : "#inputWin",
			inputFormId : "#inputForm",
			initInputView : function() {
				var me = this;
				$(this.inputWinId).dialog({
					closed : true,
					iconCls : 'icon-save',
					toolbar : [ {
						text : '新增',
						iconCls : 'icon-add',
						handler : function() {
							$(me.inputFormId).form('clear');
						}
					}, '-', {
						text : '保存',
						iconCls : 'icon-save',
						handler : function() {
							albumService.doSave();
						}
					} ],
					buttons : [ {
						text : '保存',
						handler : function() {
							albumService.doSave();
						}
					}, {
						text : '关闭',
						handler : function() {
							$(me.inputWinId).dialog('close')
						}
					} ]
				})
			}

		};
		/////////////////////////
		this.datagrid = {
			datagridId : "datagridId",
			
			initDatagrid : function() {
				// 定义冻结列
				var frozenColumns = [ [ {
					field : 'id', // 如果生成的checkbox为 <input type="checkbox" name="code"
				// value="xxx" > 则方便form提交
					checkbox : true
				}, {
					field : 'name',
					title : '相册名称',
					width : 80
				} ] ];

				// 定义标题栏
				var columns = [ [ {
					field : 'description',
					title : '相册描述',
					width : 200
				}, {
					field : 'number',
					title : '相册编号',
					width : 100
				} ] ];

				var url = WebCommon.getWebPath(this.urls.findUri);
				var temp = this;

				// 创建grid
				$(this.datagridId).datagrid({
					url : url,
					iconCls : 'icon-forward',
					fit : true,
					border : false,
					rownumbers : true,
					striped : true,
					// pageList: [30,50,100],
					pagination : true,
					singleSelect : true,
					// method:'get',
					// singleSelect : true,
					// toolbar : toolbar1,
					toolbar : temp.ids.toolbarId,
					idField : temp.keyName,
					frozenColumns : frozenColumns,
					columns : columns
				});
			}
		}
		this.ininView = function() {
			this.initInputView();
			this.initDatagrid();
			
		}
	}
</script>
</head>

<body class="easyui-layout" data-options="border:false">
	<!-- footer:'#userFt', -->
	<table id="datagridId"></table>
	<div id="toolbar">
		<table cellspacing="0" cellpadding="0">
			<tr>
				<td><a id="showInputWinBut" href="#" class="easyui-linkbutton"
					iconCls="icon-add" plain="true" onclick="album.showInputWin()">增加</a></td>
				<td>
					<div class="datagrid-btn-separator"></div>
				</td>
				<td><a id="showEditWinBut" href="#" class="easyui-linkbutton"
					iconCls="icon-edit" plain="true" onclick="album.showEidtWin()">编辑</a></td>
				<td>
					<div class="datagrid-btn-separator"></div>
				</td>
				<td><a id="showViewWinBut" href="#" class="easyui-linkbutton"
					iconCls="icon-save" plain="true" onclick="album.doSave()">详情</a></td>
				<td>
					<div class="datagrid-btn-separator"></div>
				</td>
				<td><a id="deleteBut" href="#" class="easyui-linkbutton"
					iconCls="icon-remove" plain="true" onclick="album.doDelete()">删除</a></td>
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
	<div id="inputWin" class="easyui-dialog" title="录入相册信息"
		style="width: 400px; hight: 500px; padding: 10px">
		<div class="easyui-layout">
			<form id="inputForm" method="post">
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