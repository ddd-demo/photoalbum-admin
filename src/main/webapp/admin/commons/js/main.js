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

// 通用删除方法
function executeDelete(delInfo) {
	// datagrid, keyName, delUrl, callback
	var row = $(delInfo.datagrid).datagrid('getSelected');
	if (row) {
		$.messager.confirm('删除提示', '你确认删除选中的记录吗?', function(r) {
			if (r) {
				var keyValue = row[delInfo.keyName];
				if (!keyValue) {
					$.messager.alert('删除提示', '没有唯一标示的ID，请检查唯一标示的字段名称!',
							'warning');
				}
				var url = delInfo.delUrl + "?" + delInfo.keyName + "="
						+ keyValue
				$.ajax({
					url : url,
					success : delInfo.callback
				})
			}
		});
	} else {
		$.messager.alert('删除提示', '至少选择一条记录后才能删除!', 'warning');
	}
}
function sendFormByAjax(url, formId, cudHandler) {
	var data = $(formId).serialize()
	$.ajax({
		url : url,
		type : "post",
		// contentType : "application/json;charset=utf-8",
		dataType : "json",
		data : data,
		success : function(data) {
			//if(cudHandler){
				cudHandler.callback(data);
			//}
		},
		error : function(xrequest, textStatus, errorThrown) {
			$.messager.alert('系统提示:', '请求失败！错误:' + xrequest.responseText,
					'error');
		}
	});
}
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
			$(datagridId).datagrid('reload');
		}
	} else {
		msg = '[操作失败]!';
		if (this.message) {
			msg = this.message + msg;
		}
		$.messager.alert('系统提示:', msg, 'error');
	}
}