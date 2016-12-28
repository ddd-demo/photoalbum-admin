/**
 * 原始JS封装MVC
 */
// //////视图层///////////////////////////////////////
function AlbumView(config) {
	this.service = {};
	// 默认ID设置
	$.extend(this, config); // 输入窗口对象
	var me = this;
	// 输入窗口对象
	this.inputWin = {
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
							saveFormId : me.saveFormId,
							datagridId : me.datagridId
						});
					}
				} ],
				buttons : [ {
					text : '保存',
					handler : function() {
						me.service.doSave({
							saveFormId : me.inputFormId,
							datagridId : me.datagridId
						});
					}
				}, {
					text : '关闭',
					handler : function() {
						var win=$(me.inputDialogId);
						alert(win);
						$(me.inputDialogId).dialog('close');
					}
				} ]
			};
			$(me.inputDialogId).dialog(winConfig);
		}
	};

	// 编辑窗口
	this.editWin = {
		init : function() {
			var winConfig = {
				closed : true,
				iconCls : 'icon-edit',
				buttons : [ {
					text : '保存',
					handler : function() {
						me.service.doUpdate({
							saveFormId : me.editFormId,
							datagridId : me.datagridId
						});
					}
				}, {
					text : '关闭',
					handler : function() {
						$(me.editWinId).dialog('close');
					}
				} ]
			};
			$(me.editWinId).dialog(winConfig);
		}
	};
	// 信息窗口
	this.viewWin = {
		init : function() {
			var winConfig = {
				closed : true,
				iconCls : 'icon-save',
				buttons : [ {
					text : '关闭',
					handler : function() {
						$(me.viewWinId).dialog('close');
					}
				} ]
			};
			$(me.viewWinId).dialog(winConfig);
		}
	};
	// ///////////////////////
	this.datagrid = {
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
					alert($("#inputDialogId"));
					$(me.inputDialogId).dialog({
						// left : 0,
						// top : 0,
						closed : false,
						cache : false,
						// href: 'input_user.html',
						modal : false
					});
				}
			}, '-', {
				id : 'btnUpdate',
				text : '编辑',
				iconCls : 'icon-edit',
				handler : function() {
					var handler = function(data) {
						$(me.editWinId).dialog({
							// left : 0,
							// top : 0,
							closed : false,
							cache : false,
							// href: 'input_user.html',
							modal : false
						});
						$(me.editFormId).form("load", data);
					}
					me.service.doEdit({
						keyName : me.keyName,
						datagridId : me.datagridId,
						handler : handler
					});
				}
			}, '-', {
				id : 'btnDelete',
				text : '删除',
				iconCls : 'icon-remove',
				handler : function() {
					me.service.doDelete({
						keyName : me.keyName,
						datagridId : me.datagridId
					});
				}
			}, '-', {
				id : 'btnView',
				text : '详细',
				iconCls : 'icon-redo',
				handler : function() {
					var handler = function(data) {
						var eidtwin = $(me.viewWinId).dialog({
							// left : 0,
							// top : 0,
							closed : false,
							cache : false,
							// href: 'input_user.html',
							modal : false
						});
						var selEx = me.viewFormId + " label";
						var labels = $(selEx);
						labels.each(function() {
							var val = data[$(this).attr("name")];
							if (val != null) {
								$(this).text(val);
							}
						});
					}
					me.service.doView({
						keyName : me.keyName,
						datagridId : me.datagridId,
						handler : handler
					});
				}
			}, '-', {
				id : 'btnRefresh',
				text : '刷新',
				iconCls : 'icon-reload',
				handler : function() {

				}
			} ];

			// 创建grid
			$(me.datagridId).datagrid({
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
				idField : me.keyName,
				frozenColumns : frozenColumns,
				columns : columns
			});
			// 添加查询div
			// mydg.datagridId+',
			// $("#find-div").prependTo('#datagridId,.datagrid-toolbar');

			$(me.findDivId).appendTo(".datagrid-toolbar");
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


$(function() {
	var view = new AlbumView(idList);
	var albumService = new BaseService({
		moduleName : "相册",
		controller : albumController
	});
	view.service = albumService;
	var url = albumService.controller.getUrl("findUri");
	$(view.datagridId).datagrid("load", url);
	// TIP: 配合body解决页面跳动和闪烁问题
	$("body").css({
		visibility : "visible"
	});
});