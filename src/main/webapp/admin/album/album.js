function AlbumView() {
	// 输入窗口
	this.inputWin = {
		inputWinId : "#inputWinId",
		inputFormId : "#inputFormId",
		initInputView : function() {
			var me = this;
			var winConfig={
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
				};
			$(this.inputWinId).dialog(winConfig);
		}

	};
	// ///////////////////////
	this.datagrid = {
		datagridId : "#datagridId",
		toolbarId : "#toolbarId",
		initDatagrid : function() {
			// 定义冻结列
			var frozenColumns = [ [ {
				field : 'id', // 如果生成的checkbox为 <input type="checkbox"
								// name="code"
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
			$(this.view.datagrid.datagridId).datagrid({
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
	this.initView = function() {
		this.inputWin.initInputView();
		this.datagrid.initDatagrid();

	};
	this.initView();
}

function AlbumService(config) {

	// ============属性===========================
	this.keyName = "id";
	this.urls = {
		saveUri : "album/save",
		editUri : "album/edit",
		deleteUri : "album/delete",
		updateUri : "album/update",
		viewUri : "album/view",
		findUri : "album/find"
	};

	if (config) {
		$.extend(this, config);
	}

	// ============函数==============================

	this.showInputWin = function() {
		$(this.view.inputWin.inputWinId).dialog({
			left : 0,
			top : 0,
			closed : false,
			cache : false,
			// href: 'input_user.html',
			modal : false
		});
	};
	this.showEditWin = function() {
		$(this.view.inputWin.inputWinId).dialog({
			left : 0,
			top : 0,
			closed : false,
			cache : false,
			// href: 'input_user.html',
			modal : false
		});
	};
	this.doSave = function() {
		var dgId = this.view.datagrid.datagridId
		var saveFormId = this.view.saveFormId
		var handler = new CUDHandler("相册添加", dgId);
		var me = this;
		WebCommon.doSave({
			url : me.saveUri,
			formId : saveFormId,
			handler : handler
		});

	};
	this.doUpdate = function() {
		var temp = this;
		var handler = new CUDHandler("相册更新", this.datagridId);
		WebCommon.doSave({
			url : temp.updateUri,
			formId : temp.saveFormId,
			handler : handler
		});
		// sendFormByAjax(this.updateUri, this.saveFormId, cudHandler);
	};
	this.doDelete = function() {
		var temp = this;
		var params = {
			uri : temp.deleteUri,
			keyName : temp.keyName,
			datagrid : temp.datagridId,
			callback : new CUDHandler("相册删除", temp.datagridId)
		};
		WebCommon.doDelete(params);
	};
	this.doView = function() {

	};
	this.doFind = function() {

	};

}

$(function() {
	var albumView = new AlbumView();
	alert(albumView);
	var albumService = AlbumService({
		view : albumView
	});
	albumService.initGrid();

	// TIP: 配合body解决页面跳动和闪烁问题
	$("body").css({
		visibility : "visible"
	});

});
