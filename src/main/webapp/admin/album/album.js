/**
 * 原始JS封装MVC
 */
define(function(require, exports, module) {

	var adminTool = require('admin-tool');

	// //////视图层///////////////////////////////////////
	function AlbumView(config) {
		// 给自己起一个别名，方便使用。
		var me = this;
		// 默认的初始化参数全部放入这里
		var defaultConfig = {
			moduleName : "album",
			moduleLabel : "相册",
			INPUT_DIALOG_URL : "album_input.html",
			EDIT_DIALOG_URL : "album_input.html",
			VIEW_DIALOG_URL : "album_view.html"
		};
		// 初始化
		this.init = function(config) {
			// 拷贝view工具模板。
			adminTool.initConfig(this, config, defaultConfig);
			this.datagrid.init();
			this.find();
		};
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
			var config = {
				id : me.INPUT_DIALOG_ID_H,
				href : me.INPUT_DIALOG_URL,
				title : '相册输入窗口',
				width : 400,
				height : 300,
				closed : false,
				iconCls : 'icon-save',
				onLoad : function() {
					var id_j = "#" + me.ID_NAME_MAP.FORM_ID_NAME;
					$(id_j).attr("id", me.INPUT_FORM_ID_H);
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
						me.closeDialog(me.INPUT_DIALOG_ID);
					}
				} ]
			};
			me.openDialog(config);

		};
		this.edit = function() {
			var url = 'album_input.html';
			var handler = function(data) {
				var config = {
					id : me.EDIT_DIALOG_ID_H,
					href : me.EDIT_DIALOG_URL,
					title : '相册修改窗口',
					width : 400,
					height : 300,
					closed : false,
					cache : false,
					modal : false,
					iconCls : 'icon-edit',
					onLoad : function() {
						var id_j = "#" + me.ID_NAME_MAP.FORM_ID_NAME;
						$(id_j).attr("id", me.EDIT_FORM_ID_H);
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
							me.closeDialog(me.EDIT_DIALOG_ID);
						}
					} ]
				};
				me.openDialog(config);

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
			var url = 'album_view.html';
			var handler = function(data) {
				var config = {
					id : me.VIEW_DIALOG_ID_H,
					href : me.VIEW_DIALOG_URL,
					title : '相册信息窗口',
					width : 300,
					height : 200,
					closed : false,
					cache : false,
					modal : false,
					iconCls : 'icon-edit',
					onLoad : function() {
						var id_j = "#" + me.ID_NAME_MAP.VIEW_FORM_ID_NAME;
						$(id_j).attr("id", me.VIEW_FORM_ID_H);
						var selEx = me.VIEW_FORM_ID + " label";
						var labels = $(selEx);
						if (labels) {
							labels.each(function() {
								var val = data[$(this).attr("name")];
								if (val != null) {
									$(this).text(val);
								}
							});
						}
					},
					onClose : function() {
						me.closeDialog(me.VIEW_DIALOG_ID);
					},
					buttons : [ {
						text : '关闭',
						handler : function() {
							me.closeDialog(me.VIEW_DIALOG_ID);
						}
					} ]
				};
				me.openDialog(config);
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
				}, '-', {
					id : 'btnClose',
					text : '关闭',
					iconCls : 'icon-cancel',
					handler : function() {
						me.destroy();
					}
				}, '-', {
					id : 'btnPrint',
					text : '打印',
					iconCls : 'icon-print',
					handler : function() {

					}
				}, '-', {
					id : 'butHelp',
					text : '帮助',
					iconCls : 'icon-help',
					handler : function() {

					}
				} ];

				// 初始化工具条
				$(me.BUTS_ID).datagrid({
					border : false,
					toolbar : toolbar
				});
				var dgConfig = {
					id : me.DATAGRID_ID,
					// url : url,
					iconCls : 'icon-forward',
					cache : false,
					fit : true,
					border : false,
					rownumbers : true,
					striped : true,
					// pageList: [30,50,100],
					pagination : true,
					singleSelect : true,
					// method:'get',
					// singleSelect : true,
					// toolbar : toolbar,
					toolbar : me.TOOLBAR_ID,
					idField : me.PRIMARY_KEY,
					frozenColumns : frozenColumns,
					columns : columns
				};
				$(me.DATAGRID_ID).datagrid(dgConfig);
				$(me.TOOLBAR_ID).find(".datagrid-toolbar").css("border", "0");

			}
		};
	}
	module.exports = new AlbumView();
});
