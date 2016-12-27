/**
 * 原始JS封装MVC
 */
// //////视图层///////////////////////////////////////////////////
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
						$(me.inputWin.inputFormId).form('clear');
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
						$(me.inputWin.inputWinId).dialog('close');
					}
				} ]
			};
			$(this.inputWinId).dialog(winConfig);
		}
	};
	// 编辑窗口
	this.editWin = {
		editWinId : "#editWinId",
		editFormId : "#editFormId",
		init : function() {
			var winConfig = {
				closed : true,
				iconCls : 'icon-edit',
				buttons : [ {
					text : '保存',
					handler : function() {
						me.service.doUpdate({
							saveFormId : me.editWin.editFormId,
							datagridId : me.datagrid.datagridId
						});
					}
				}, {
					text : '关闭',
					handler : function() {
						$(me.editWin.editWinId).dialog('close');
					}
				} ]
			};
			$(this.editWinId).dialog(winConfig);
		}
	};
	// 信息窗口
	this.viewWin = {
		viewWinId : "#viewWinId",
		viewFormId : "#viewFormId",
		init : function() {
			var winConfig = {
				closed : true,
				iconCls : 'icon-save',
				buttons : [ {
					text : '关闭',
					handler : function() {
						$(me.viewWin.viewWinId).dialog('close');
					}
				} ]
			};
			$(me.viewWin.viewWinId).dialog(winConfig);
		}
	};
	// ///////////////////////
	this.datagrid = {
		keyName : "id",
		datagridId : "#datagridId",
		finddivId : "#find-div",
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

			var toolbar = [ {
				id : 'btnAdd',
				text : '新增',
				iconCls : 'icon-add',
				handler : function() {
					$(me.inputWin.inputWinId).dialog({
						// left : 0,
						// top : 0,
						closed : false,
						cache : false,
						// href: 'input_user.html',
						modal : false
					});
				}
			}, '-',{
				id : 'btnUpdate',
				text : '编辑',
				iconCls : 'icon-edit',
				handler : function() {
					var handler = function(data) {
						$(me.editWin.editWinId).dialog({
							// left : 0,
							// top : 0,
							closed : false,
							cache : false,
							// href: 'input_user.html',
							modal : false
						});
						$(me.editWin.editFormId).form("load", data);
					}
					me.service.doEdit({
						keyName : me.datagrid.keyName,
						datagridId : me.datagrid.datagridId,
						handler : handler
					});
				}
			},'-', {
				id : 'btnDelete',
				text : '删除',
				iconCls : 'icon-remove',
				handler : function() {
					me.service.doDelete({
						keyName : me.datagrid.keyName,
						datagridId : me.datagrid.datagridId
					});
				}
			},'-', {
				id : 'btnView',
				text : '详细',
				iconCls : 'icon-redo',
				handler : function() {
					var handler = function(data) {
						var eidtwin = $(me.viewWin.viewWinId).dialog({
							// left : 0,
							// top : 0,
							closed : false,
							cache : false,
							// href: 'input_user.html',
							modal : false
						});
						var selEx = me.viewWin.viewFormId + " label";
						var labels = $(selEx);
						labels.each(function() {
							var val = data[$(this).attr("name")];
							if (val != null) {
								$(this).text(val);
							}
						});
					}
					me.service.doView({
						keyName : me.datagrid.keyName,
						datagridId : me.datagrid.datagridId,
						handler : handler
					});
				}
			},'-', {
				id : 'btnRefresh',
				text : '刷新',
				iconCls : 'icon-reload',
				handler : function() {

				}
			}];

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
				toolbar : toolbar,
				idField : mydg.keyName,
				frozenColumns : frozenColumns,
				columns : columns
			});
			// 添加查询div
			// mydg.datagridId+',
			// $("#find-div").prependTo('#datagridId,.datagrid-toolbar');
			
			$("#find-div").appendTo(".datagrid-toolbar");
		}
	}
	this.init = function() {
		me.inputWin.init();
		me.editWin.init();
		me.viewWin.init();
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
	var url = albumService.controller.getUrl("findUri");
	alert(url);
	albumService.doFind({
		url : url,
		datagridId : view1.datagrid.datagridId,
		params : {}
	});

	// TIP: 配合body解决页面跳动和闪烁问题
	$("body").css({
		visibility : "visible"
	});
});
