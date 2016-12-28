package com.fengtaiguang.photoalbum.admin.web.spring.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import com.fengtaiguang.ddd.framwork.domain.vo.query.IQueryAndResult;
import com.fengtaiguang.ddd.framwork.domain.vo.query.QueryAndResult;
import com.fengtaiguang.ddd.framwork.web.exception.ControllerException;
import com.fengtaiguang.photoalbum.admin.web.query.QueryAndResultEasyUI;
import com.fengtaiguang.photoalbum.application.dto.AlbumDto;

@Controller
@RequestMapping(AlbumControllerSpring.BAST_URI + AlbumControllerSpring.MODULE_URI)
public class AlbumControllerSpring extends BaseControllerSpring {

	public final static String MODULE_NAME = "album";
	public final static String MODULE_URI = MODULE_NAME + "/";

	// 模块的视图名称
	public final static String ALBUM_MAIN_VIEW = BAST_URI + MODULE_URI + MODULE_NAME;
	// 远程访问接口
	public final static String ALBUM_BAST_OPEN_URL = BAST_OPEN_URL + MODULE_URI;
	public final static String ALBUM_SAVE_OPEN_URL = ALBUM_BAST_OPEN_URL + SAVE_URL;
	public final static String ALBUM_GET_OPEN_URL = ALBUM_BAST_OPEN_URL + GET_URL;
	public final static String ALBUM_UPDATE_OPEN_URL = ALBUM_BAST_OPEN_URL + UPDATE_URL;
	public final static String ALBUM_DELETE_OPEN_URL = ALBUM_BAST_OPEN_URL + DELETE_URL;
	public final static String ALBUM_FIND_OPEN_URL = ALBUM_BAST_OPEN_URL + FIND_URL;

	private Logger logger = Logger.getLogger(AlbumControllerSpring.class);
	private ObjectMapper mapper = new ObjectMapper();

	public AlbumControllerSpring() {
		logger.debug("............AlbumControllerSpring");

	}

	@RequestMapping(MAIN_URL)
	public String main(Map model) throws Exception {
		model.putAll(viewUriMap(MODULE_URI));
		model.putAll(viewIdMap());
		
		model.put("VIEW_JSON", mapper.writeValueAsString(model));
		return ALBUM_MAIN_VIEW;
	}

	@RequestMapping(FIND_URL)
	@ResponseBody
	public IQueryAndResult find(AlbumDto album) throws Exception {
		QueryAndResult queryAndResult = new QueryAndResult();
		String jsonString = post(ALBUM_FIND_OPEN_URL, "{}");
		CollectionType listType = mapper.getTypeFactory().constructCollectionType(ArrayList.class, AlbumDto.class);
		List<AlbumDto> list;
		list = mapper.readValue(jsonString, listType);
		QueryAndResultEasyUI queryAndResultEasyUI = new QueryAndResultEasyUI();
		queryAndResultEasyUI.setTotal(list.size());
		queryAndResultEasyUI.setRows(list);
		return queryAndResultEasyUI;
	}

	@RequestMapping(SAVE_URL)
	@ResponseBody
	public Boolean save(AlbumDto album) throws Exception {
		String jsonString = mapper.writeValueAsString(album);
		post(ALBUM_SAVE_OPEN_URL, jsonString);
		return true;
	}

	@RequestMapping(EDIT_URL + "/{id}")
	@ResponseBody
	public AlbumDto edit(@PathVariable String id) throws Exception {
		AlbumDto album = view(id);
		return album;
	}

	@RequestMapping(VIEW_URL + "/{id}")
	@ResponseBody
	public AlbumDto view(@PathVariable String id) throws Exception {
		if (StringUtils.isBlank(id)) {
			new ControllerException("必须选择有效的记录!");
		}
		String content = post(ALBUM_GET_OPEN_URL + "/" + id, "{}");
		AlbumDto album = null;
		if (!StringUtils.isBlank(content)) {
			album = mapper.readValue(content, AlbumDto.class);
		}
		if (album == null) {
			new ControllerException("没有数据!");
		}
		return album;
	}

	@RequestMapping(UPDATE_URL)
	@ResponseBody
	public Boolean update(AlbumDto album) throws Exception {
		post(ALBUM_UPDATE_OPEN_URL, mapper.writeValueAsString(album));
		return true;
	}

	@RequestMapping(DELETE_URL + "/{id}")
	@ResponseBody
	public Boolean delete(@PathVariable String id) throws Exception {
		String url = ALBUM_DELETE_OPEN_URL + "/" + id;
		post(url, "{}");
		return true;
	}
}
