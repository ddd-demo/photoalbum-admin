/**
 * 原始JS封装MVC
 */
// //////视图层///////////////////////////////////////
function AlbumView(config) {
	this.service = new BaseService({
		moduleName : "相册",
		controller : config
	});
	// 默认ID设置
	$.extend(this, config);
	var me = this;
	this.getUrl = function(urlName) {
		return WebCommon.getWebPath(this[urlName]);
	}
	this.find = function() {
		me.service.doFind({
			datagridId : me.DATAGRID_ID,
			url : me.getUrl("FIND_URI")
		});
	}
	this.save = function() {
		me.service.doSave({
			inputFormId : me.INPUT_FORM_ID,
			datagridId : me.DATAGRID_ID
		});
	}
	this.update = function() {
		me.service.doUpdate({
			editFormId : me.EDIT_FORM_ID,
			datagridId : me.DATAGRID_ID
		});
	}
	this.edit = function() {
		var handler = function(data) {
			$(me.EDIT_DIALOG_ID).dialog({
				// left : 0,
				// top : 0,
				closed : false,
				cache : false,
				// href: 'input_user.html',
				modal : false
			});
			$(me.EDIT_FORM_ID).form("load", data);
		}
		me.service.doEdit({
			primaryKey : me.PRIMARY_KEY,
			datagridId : me.DATAGRID_ID,
			handler : handler
		});
	}
	this.del = function() {
		me.service.doDelete({
			primaryKey : me.PRIMARY_KEY,
			datagridId : me.DATAGRID_ID
		});
	}
	this.view = function() {
		var handler = function(data) {
			var eidtwin = $(me.VIEW_DIALOG_ID).dialog({
				// left : 0,
				// top : 0,
				closed : false,
				cache : false,
				// href: 'input_user.html',
				modal : false
			});
			var selEx = me.VIEW_FORM_ID + " label";
			var labels = $(selEx);
			labels.each(function() {
				var val = data[$(this).attr("name")];
				if (val != null) {
					$(this).text(val);
				}
			});
		}
		me.service.doView({
			primaryKey : me.PRIMARY_KEY,
			datagridId : me.DATAGRID_ID,
			handler : handler
		});
	}
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
						$(me.INPUT_FORM_ID).form('clear');
					}
				}, '-', {
					text : '保存',
					iconCls : 'icon-save',
					handler : function() {
						me.save();
					}
				} ],
				buttons : [ {
					text : '保存',
					handler : function() {
						me.save();
					}
				}, {
					text : '关闭',
					handler : function() {
						$(me.INPUT_DIALOG_ID).dialog('close');
					}
				} ]
			};
			$(me.INPUT_DIALOG_ID).dialog(winConfig);
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
						me.update();
					}
				}, {
					text : '关闭',
					handler : function() {
						$(me.EDIT_DIALOG_ID).dialog('close');
					}
				} ]
			};
			$(me.EDIT_DIALOG_ID).dialog(winConfig);
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
						$(me.VIEW_DIALOG_ID).dialog('close');
					}
				} ]
			};
			$(me.VIEW_DIALOG_ID).dialog(winConfig);
		}
	};
	// 列表窗口
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
					$(me.INPUT_DIALOG_ID).dialog({
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
					me.edit();
				}
			}, '-', {
				id : 'btnDelete',
				text : '删除',
				iconCls : 'icon-remove',
				handler : function() {
					me.del();
				}
			}, '-', {
				id : 'btnView',
				text : '详细',
				iconCls : 'icon-redo',
				handler : function() {
					me.view();
				}
			}, '-', {
				id : 'btnRefresh',
				text : '刷新',
				iconCls : 'icon-reload',
				handler : function() {

				}
			} ];

			// 创建grid
			$(me.DATAGRID_ID).datagrid({
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
				idField : me.PRIMARY_KEY,
				frozenColumns : frozenColumns,
				columns : columns
			});
			// 添加查询div
			// mydg.datagridId+',
			// $("#find-div").prependTo('#datagridId,.datagrid-toolbar');

			$(me.FIND_DIALOG_ID).appendTo(".datagrid-toolbar");
		}
	}
	// 初始化
	this.init = function() {
		me.inputWin.init();
		me.editWin.init();
		me.viewWin.init();
		me.datagrid.init();
	};
	this.init();
}
