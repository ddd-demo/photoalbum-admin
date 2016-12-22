package com.fengtaiguang.photoalbum.admin.web.spring.controller;

import java.util.ArrayList;
import java.util.List;

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
import com.fengtaiguang.photoalbum.admin.web.query.QueryAndResultEasyUI;
import com.fengtaiguang.photoalbum.application.dto.AlbumDto;

@Controller
@RequestMapping("/admin/album/")
public class AlbumControllerSpring extends BaseControllerSpring {
	Logger logger = Logger.getLogger(AlbumControllerSpring.class);
	private ObjectMapper mapper = new ObjectMapper();
	public static String ALBUM_BAST_URL = "http://localhost:8080/photoalbum-open/open/album/";
	public static String ALBUM_SAVE_URL = ALBUM_BAST_URL + "save";
	public static String ALBUM_GET_URL = ALBUM_BAST_URL + "get";
	public static String ALBUM_UPDATE_URL = ALBUM_BAST_URL + "update";
	public static String ALBUM_DELETE_URL = ALBUM_BAST_URL + "delete";
	public static String ALBUM_find_URL = ALBUM_BAST_URL + "find";

	public AlbumControllerSpring() {
		logger.debug("............AlbumControllerSpring");
	}

	@RequestMapping("main")
	public String main() {
		return "album/album";
	}

	@RequestMapping(value = "find")
	@ResponseBody
	public IQueryAndResult find(AlbumDto album) throws Exception {
		QueryAndResult queryAndResult = new QueryAndResult();
		String jsonString = post(ALBUM_find_URL, "{}");
		CollectionType listType = mapper.getTypeFactory().constructCollectionType(ArrayList.class, AlbumDto.class);
		List<AlbumDto> list;
		// 如果是传统三层的话，直接调用service
		list = mapper.readValue(jsonString, listType);
		QueryAndResultEasyUI queryAndResultEasyUI = new QueryAndResultEasyUI();
		queryAndResultEasyUI.setTotal(list.size());
		queryAndResultEasyUI.setRows(list);
		return queryAndResultEasyUI;
	}

	@RequestMapping("save")
	@ResponseBody
	public Boolean save(AlbumDto album) throws Exception {
		String jsonString = mapper.writeValueAsString(album);
		post(ALBUM_SAVE_URL, jsonString);
		return true;
	}

	@RequestMapping("edit/{id}")
	@ResponseBody
	public AlbumDto edit(@PathVariable String id) throws Exception {
		AlbumDto album = view(id);
		return album;
	}

	@RequestMapping("view/{id}")
	@ResponseBody
	public AlbumDto view(@PathVariable String id) throws Exception {
		String content = post(ALBUM_GET_URL + "/" + id, "{}");
		AlbumDto album = null;
		if (!StringUtils.isBlank(content)) {
			album = mapper.readValue(content, AlbumDto.class);
		}

		return album;
	}

	@RequestMapping("update")
	@ResponseBody
	public Boolean update(AlbumDto album) throws Exception {
		post(ALBUM_UPDATE_URL, mapper.writeValueAsString(album));
		return true;
	}

	@RequestMapping("delete/{id}")
	@ResponseBody
	public Boolean delete(@PathVariable String id) throws Exception {
		String url = ALBUM_DELETE_URL + "/" + id;
		post(url, "{}");
		return true;
	}
}
