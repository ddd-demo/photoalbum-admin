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
	this.ids = {
		datagridId : "#albumDatagrid",
		inputWinId : "#inputAlbumWin",
		editWinId : "#editAlbumWin",
		viewWinId : "#viewAlbumWin",
		toolbarId : "#toolbar",
		saveFormId : "#albumForm"
	};
	if (config) {
		$.extend(this, config);
	}
	// ============函数==============================
	this.showInputWin = function() {
		$(this.ids.inputWinId).dialog({
			left : 0,
			top : 0,
			closed : false,
			cache : false,
			// href: 'input_user.html',
			modal : false
		});
	};
	this.showEditWin = function() {
		$(this.ids.inputWinId).dialog({
			left : 0,
			top : 0,
			closed : false,
			cache : false,
			// href: 'input_user.html',
			modal : false
		});
	};
	this.doSave = function() {
		var my = this;

		var handler = new CUDHandler("相册添加", this.datagridId);
		WebCommon.doSave({
			url : album.saveUri,
			formId : album.saveFormId,
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
	var albumService = AlbumService();
	albumService.initGrid();
	// TIP: 配合body解决页面跳动和闪烁问题
	$("body").css({
		visibility : "visible"
	});
	
	
});
