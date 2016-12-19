var album = {
	keyName : "id",
	urls : {
		saveUri : "album/save",
		editUri : "album/edit",
		deleteUri : "album/delete",
		updateUri : "album/update",
		viewUri : "album/view",
		findUri : "album/find"
	},
	ids:{
		datagridId : "#albumDatagrid",
		inputWinId : "#inputAlbumWin",
		editWinId : "#editAlbumWin",
		viewWinId : "#viewAlbumWin",
		toolbarId : "#toolbar",
		saveFormId : "#albumForm",
	},
	showInputWin : function() {
		$(this.ids.inputWinId).dialog({
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
	doSave : function() {
		var my=this;
		$.ajax({
			url : WebCommon.getWebPath(my.urls.saveUri),
			type : "post",
			dataType : "json",
			data : $(my.ids.saveFormId).serialize(),
			success : function(data) {
				//handler.callback(data)
				//alert(data);
				if(data){
					$(my.ids.datagridId).datagrid('reload');
				}
			},
			error : function(xrequest, textStatus, errorThrown) {
				$.messager.alert('系统提示:', '请求失败！错误:'
 						+ xrequest.responseText, 'error');
			}
		});
		
		/*
		var handler = new CUDHandler("相册添加", this.datagridId);
		WebCommon.doSave({
			url : album.saveUri,
			formId : album.saveFormId,
			handler : handler
		});*/
	},
	doUpdate : function() {
		var temp = this;
		var handler = new CUDHandler("相册更新", this.datagridId);
		WebCommon.doSave({
			url : temp.updateUri,
			formId : temp.saveFormId,
			handler : handler
		});
		// sendFormByAjax(this.updateUri, this.saveFormId, cudHandler);
	},
	doDelete : function() {
		var temp = this;
		var params = {
			uri : temp.deleteUri,
			keyName : temp.keyName,
			datagrid : temp.datagridId,
			callback : new CUDHandler("相册删除", temp.datagridId)
		};
		WebCommon.doDelete(params);
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

		var url = WebCommon.getWebPath(this.urls.findUri);
		var temp = this;
		// 创建grid
		$(this.ids.datagridId).datagrid({
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
};

$(function() {
	album.initGrid();
	// TIP: 配合body解决页面跳动和闪烁问题
	$("body").css({
		visibility : "visible"
	});
});
