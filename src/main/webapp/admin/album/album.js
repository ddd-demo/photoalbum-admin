/**
 * 原始JS封装MVC
 */
// //////视图层///////////////////////////////////////
var ViewBase = {
	initVAR : function(config) {
		$.extend(this, config);
		var uriMap = config.uriMap;
		var idMap = config.idMap;
		// 重置补全相对URI
		for ( var property in uriMap) {
			var uri = uriMap[property];
			this[property] = this.getUri(uri);
		}
		for ( var property in idMap) {
			var idValue = idMap[property];
			// 这个表示在HTML页面用的ID，前面没有加#
			this[property + "_H"] = idValue;
			// 这个表示Juery中使用的ID，前面加#。
			this[property] = "#" + idValue;
		}
	},
	destroy : function() {
		$(this.INPUT_DIALOG_ID).dialog('destroy');
		$(this.EDIT_DIALOG_ID).dialog('destroy');
		$(this.VIEW_DIALOG_ID).dialog('destroy');
	},
	getUri : function(uri) {
		return WebCommon.getWebPath(uri);
	},
	DIV : "<div></div>"
};
function AlbumView(config) {
	// 给自己起一个别名，方便使用。
	var me = this;
	// 拷贝系统全局常量
	$.extend(this, ViewBase);

	var moduleName = "相册";

	this.service = new BaseService({
		moduleName : moduleName,
	});

	this.find = function() {
		me.service.doFind({
			datagridId : me.DATAGRID_ID,
			url : me.FIND_URI
		});
	};
	this.save = function() {
		me.service.doSave({
			url : me.SAVE_URI,
			inputFormId : me.INPUT_FORM_ID,
			datagridId : me.DATAGRID_ID
		});
	};
	this.update = function() {
		me.service.doUpdate({
			url : me.UPDATE_URI,
			editFormId : me.EDIT_FORM_ID,
			datagridId : me.DATAGRID_ID
		});
	}
	this.refresh = function() {
		$(me.DATAGRID_ID).datagrid("reload");
	};
	this.input = function() {
		var url = 'album_input.jsp?FORM_ID=' + me.INPUT_FORM_ID_H;
		var winConfig = {
			id : me.INPUT_DIALOG_ID_H,
			href : url,
			title : '相册输入窗口',
			width : 400,
			height : 300,
			closed : false,
			iconCls : 'icon-save',
			onLoad : function() {
				// $(me.INPUT_DIALOG_ID+" form").attr("id",me.INPUT_FORM_ID_H);
			},
			onClose : function() {
				$(this).dialog('destroy');
			},
			toolbar : [ {
				text : '新增',
				iconCls : 'icon-add',
				handler : function() {
					$(me.INPUT_DIALOG_ID).form('clear');
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
					$(me.INPUT_DIALOG_ID).dialog('destroy');
				}
			} ]
		};
		if ($(me.INPUT_DIALOG_ID)) {
			$(me.INPUT_DIALOG_ID).dialog('destroy');
		}

		$(me.DIV).dialog(winConfig);
	};
	this.edit = function() {
		var url = 'album_input.jsp?FORM_ID=' + me.EDIT_FORM_ID_H;
		var handler = function(data) {
			var winConfig = {
				id : me.EDIT_DIALOG_ID_H,
				href : url,
				title : '相册修改窗口',
				width : 400,
				height : 300,
				closed : false,
				cache : false,
				modal : false,
				iconCls : 'icon-edit',
				onLoad : function() {
					// $(me.INPUT_DIALOG_ID+"
					// form").attr("id",me.INPUT_FORM_ID_H);
					$(me.EDIT_FORM_ID).form('load', data);
				},
				onClose : function() {
					$(this).dialog('destroy');
				},
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
			if ($(me.INPUT_DIALOG_ID)) {
				$(me.INPUT_DIALOG_ID).dialog('destroy');
			}
			$(me.DIV).dialog(winConfig);

		}
		me.service.doEdit({
			url : me.EDIT_URI,
			primaryKey : me.PRIMARY_KEY,
			datagridId : me.DATAGRID_ID,
			handler : handler
		});
	};
	this.del = function() {
		me.service.doDelete({
			url : me.DELETE_URI,
			primaryKey : me.PRIMARY_KEY,
			datagridId : me.DATAGRID_ID
		});
	};
	this.view = function() {
		var url = 'album_view.jsp?FORM_ID=' + me.VIEW_FORM_ID_H;
		var handler = function(data) {
			var winConfig = {
				id : me.VIEW_DIALOG_ID_H,
				href : url,
				title : '相册信息窗口',
				width : 300,
				height : 200,
				closed : false,
				cache : false,
				modal : false,
				iconCls : 'icon-edit',
				onLoad : function() {
					// $(me.INPUT_DIALOG_ID+"
					// form").attr("id",me.INPUT_FORM_ID_H);
				},
				onClose : function() {
					$(this).dialog('destroy');
				},
				buttons : [ {
					text : '关闭',
					handler : function() {
						$(me.VIEW_DIALOG_ID).dialog('close');
					}
				} ]
			};
			if ($(me.VIEW_DIALOG_ID)) {
				$(me.VIEW_DIALOG_ID).dialog('destroy');
			}
			$(me.DIV).dialog(winConfig);

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
			url : me.VIEW_URI,
			primaryKey : me.PRIMARY_KEY,
			datagridId : me.DATAGRID_ID,
			handler : handler
		});
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
					me.input();
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
					me.refresh();
				}
			} , '-', {
				id : 'btnTest',
				text : 'Test1',
				iconCls : 'icon-reload',
				handler : function() {
					me.destroy();
				}
			}];

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

			// $(me.FIND_DIALOG_ID).appendTo(".datagrid-toolbar");
		}
	};
	// 初始化
	this.init = function() {
		me.initVAR(config);
		me.datagrid.init();
		/*
		 * $(body).unload(function(){ me.destroy(); });
		 */
	};
	this.init();
}
