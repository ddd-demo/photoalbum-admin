package com.fengtaiguang.photoalbum.admin.web.spring.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class AlbumViewConfig {

	public Map initView() {
		HashMap viewMap = new HashMap();
		//
		viewMap.put("inputDialogId", UUID.randomUUID().toString());
		viewMap.put("inputFormId", UUID.randomUUID().toString());
		viewMap.put("editWinId", UUID.randomUUID().toString());
		viewMap.put("editFormId", UUID.randomUUID().toString());
		viewMap.put("viewFormId", UUID.randomUUID().toString());
		viewMap.put("findDivId", UUID.randomUUID().toString());
		viewMap.put("findFormId", UUID.randomUUID().toString());
		//
		viewMap.put("saveUri", "album/save");
		viewMap.put("editUri", "album/edit");
		viewMap.put("deleteUri", "album/delete");
		viewMap.put("updateUri", "album/update");
		viewMap.put("updateUri", "album/view");
		viewMap.put("updateUri", "album/find");
		return viewMap;
	}

}
