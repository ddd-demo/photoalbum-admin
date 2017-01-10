$(function() {
	$("#sysTree").tree({
		url : WebCommon.getWebPath("commons/data/sys_tree_data.json"),
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