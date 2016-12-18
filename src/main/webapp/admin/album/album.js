//相册公用的函数
var album = {
	my : this,
	key : "id",
	saveUri : "save",
	editUri : "edit",
	deleteUri : "delete",
	updateUri : "update",
	viewUri : "view",
	findUri : "find",
	datagridId : "#albumDatagrid",
	inputWinId : "#inputAlbumWin",
	editWinId : "#editAlbumWin",
	viewWinId : "#viewAlbumWin",
	toolbar : "#toolbar",
	saveFormId : "#albumForm",
	showInputWin : function() {
		$(this.inputWinId).dialog({
			left : 0,
			top : 0,
			closed : false,
			cache : false,
			// href: 'input_user.html',
			modal : false
		});
	},
	showEditWin : function() {

	},
	doSave : function(form) {
		var cudHandler = new CUDHandler("相册添加", this.datagridId);
		sendFormByAjax(this.saveUri, this.saveFormId, cudHandler);
	},
	doUpdate : function() {
		var cudHandler = new CUDHandler("相册更新", this.datagridId);
		sendFormByAjax(this.updateUri, this.saveFormId, cudHandler);
	},
	doDelete : function() {
		var temp = this;
		executeDelete({
			delUrl : temp.deleteUri,
			keyName : temp.keyName,
			datagrid : temp.datagridId,
			callback : new CUDHandler("相册删除", temp.datagridId)
		});
	},
	doView : function() {

	},
	doFind : function() {

	},
	initGrid : function() {
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

		var url = "find";
		var temp = this;
		// 创建grid
		$(this.datagridId).datagrid({
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
			toolbar : temp.toolbar,
			url : temp.findUri,
			idField : temp.keyName,
			frozenColumns : frozenColumns,
			columns : columns
		});

	}
};

$(function() {
	album.initGrid();

	// TIP: 配合body解决页面跳动和闪烁问题
	$("body").css({
		visibility : "visible"
	});
});
