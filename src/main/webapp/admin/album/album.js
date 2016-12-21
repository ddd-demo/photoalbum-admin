function AlbumView() {
	var me = this;
	this.service = {};
	// 输入窗口
	this.inputWin = {
		inputWinId : "#inputWinId",
		inputFormId : "#inputFormId",
		init : function() {
			var winConfig = {
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
						me.service.doSave({
							saveFormId : me.inputWin.saveFormId,
							datagridId : me.datagrid.datagridId
						});
					}
				} ],
				buttons : [ {
					text : '保存',
					handler : function() {
						me.service.doSave({
							saveFormId : me.inputWin.inputFormId,
							datagridId : me.datagrid.datagridId
						});
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
		keyName : "id",
		datagridId : "#datagridId",
		toolbarId : "#toolbarId",
		init : function() {
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

			var mydg = this;
			// 工具条单击事件
			$("#showInputWinBut").on("click", function() {
				$(me.inputWin.inputWinId).dialog({
					left : 0,
					top : 0,
					closed : false,
					cache : false,
					// href: 'input_user.html',
					modal : false
				});
			});
			$("#showEditWinBut").on("click", function() {

			});
			$("#showViewWinBut").on("click", function() {

			});
			$("#deleteBut").on("click", function() {
				me.service.doDelete({
					keyName :me.datagrid.keyName,
					datagridId : me.datagrid.datagridId
				});
			});
			// 创建grid
			$(mydg.datagridId).datagrid({
				// url : url,
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
				toolbar : mydg.toolbarId,
				idField : mydg.keyName,
				frozenColumns : frozenColumns,
				columns : columns
			});
		}
	}
	this.init = function() {
		me.inputWin.init();
		me.datagrid.init();
	};
	this.init();
}

var albumController = {
	saveUri : "album/save",
	editUri : "album/edit",
	deleteUri : "album/delete",
	updateUri : "album/update",
	viewUri : "album/view",
	findUri : "album/find",
	getUrl : function(urlName) {
		return WebCommon.getWebPath(this[urlName]);
	}
};
$(function() {
	var view1 = new AlbumView();
	var albumService = new BaseService({
		moduleName : "相册",
		controller : albumController
	});
	view1.service = albumService;
	albumService.doFind(view1.datagrid.datagridId);

	// TIP: 配合body解决页面跳动和闪烁问题
	$("body").css({
		visibility : "visible"
	});

});
