$(function() {
	$("#sysTree").tree({
		url : "commons/data/sys_tree_data.json",
		onClick : doMenuClick
	});
	function doMenuClick(node) {
		if ($("#sysTree").tree("isLeaf", node.target) == false)
			return;
		var id = node.id;
		var text = node.text;
		var url = node.url;
		if (!id)
			return;
		var elTab = parent.$('#mainTabs');
		if (elTab.tabs('exists', text)) {
			elTab.tabs('select', text);
		} else {
			var content = '<div style="width:100%;height:100%;overflow:hidden;">'
					+ '<iframe src="'
					+ url
					+ '" scrolling="auto" style="width:100%;height:100%;border:0;" ></iframe></div>';
			elTab.tabs('add', {
				title : text,
				content : content,
				// href: url,
				closable : true
			});
		}
	}

});

/** 增加、修改、删除操作后的默认回调函数。 */
function CUDHandler(message, datagridId) {
	// 对应的本次操作消息
	this.message = message;
	// 要刷新的datagrid控件ID
	this.datagridId = datagridId;
}
CUDHandler.prototype.callback = function(isSuccess) {
	var msg;
	if (isSuccess) {
		msg = '[操作成功]!';
		if (this.message) {
			msg = this.message + msg;
		}
		$.messager.alert('系统提示:', msg, 'info');
		if (this.datagridId) {
			$(this.datagridId).datagrid('reload');
		}
	} else {
		msg = '[操作失败]!';
		if (this.message) {
			msg = this.message + msg;
		}
		$.messager.alert('系统提示:', msg, 'error');
	}
}

// ========================service============================
function BaseService(config) {
	var me = this;
	this.controller = {};
	if (config) {
		$.extend(this, config);
	}
	// ============函数==============================
	this.doSave = function(config) {
		var handler = new CUDHandler(me.moduleName + "增加", config.datagridId);
		var url = me.controller.getUrl("saveUri");
		var data = $(config.saveFormId).serialize();
		$.ajax({
			url : url,
			type : "post",
			dataType : "json",
			data : data,
			success : function(data) {
				handler.callback(data)
			},
			error : function(xrequest, textStatus, errorThrown) {
				$.messager.alert('系统提示:', '请求失败！错误:' + xrequest.responseText,
						'error');
			}
		});
	};
	this.doUpdate = function(config) {
		var handler = new CUDHandler(this.moduleName + "修改", config.datagridId);
		var url = me.controller.getUrl("updateUri");
		var data = $(config.saveFormId).serialize();
		$.ajax({
			url : url,
			type : "post",
			dataType : "json",
			data : data,
			success : function(data) {
				handler.callback(data)
			},
			error : function(xrequest, textStatus, errorThrown) {
				$.messager.alert('系统提示:', '请求失败！错误:' + xrequest.responseText,
						'error');
			}
		});
	};
	this.doDelete = function(config) {
		var handler = new CUDHandler(this.moduleName + "删除", config.datagridId);
		var row = $(config.datagridId).datagrid('getSelected');
		if (row) {
			$.messager.confirm('删除提示', '你确认删除选中的记录吗?', function(r) {
				if (r) {
					var keyValue = row[config.keyName];
					if (!keyValue) {
						$.messager.alert('删除提示', '没有唯一标示的ID，请检查唯一标示的字段名称!',
								'warning');
					}
					var url = me.controller.getUrl("deleteUri") + "/"
							+ keyValue
					$.ajax({
						url : url,
						type : "get",
						dataType : "json",
						success : function(data) {
							if (data == true) {
								$(config.datagridId).datagrid('reload');
							} else {
								$.messager.alert('系统提示:', "删除失败", 'error');
							}

						},
						error : function(xrequest, textStatus, errorThrown) {
							$.messager.alert('系统提示:', '请求失败！错误:'
									+ xrequest.responseText, 'error');
						}
					});
				}
			});
		} else {
			$.messager.alert('系统提示', '至少选择一条记录后才能删除!', 'warning');
		}

	};
	this.doEdit = function(config) {
		var row = $(config.datagridId).datagrid('getSelected');
		if (row) {
			var keyValue = row[config.keyName];
			var url = me.controller.getUrl("editUri") + "/" + keyValue
			$.ajax({
				url : url,
				type : "get",
				dataType : "json",
				success : function(data) {
					config.handler(data);
				},
				error : function(xrequest, textStatus, errorThrown) {
					$.messager.alert('系统提示:', '请求失败！错误:'
							+ xrequest.responseText, 'error');
				}
			});
		} else {
			$.messager.alert('系统提示', '至少选择一条记录后才能编辑!', 'warning');
		}

	};
	this.doView = function(config) {
		var row = $(config.datagridId).datagrid('getSelected');
		if (row) {
			var keyValue = row[config.keyName];
			var url = me.controller.getUrl("viewUri") + "/" + keyValue
			$.ajax({
				url : url,
				type : "get",
				dataType : "json",
				success : function(data) {
					config.handler(data);
				},
				error : function(xrequest, textStatus, errorThrown) {
					$.messager.alert('系统提示:', '请求失败！错误:'
							+ xrequest.responseText, 'error');
				}
			});
		} else {
			$.messager.alert('系统提示', '至少选择一条记录后才能加载数据!', 'warning');
		}

	};
	this.doFind = function(datagridId) {
		var url = me.controller.getUrl("findUri");
		$(datagridId).datagrid({
			url : url
		})
	};

}
