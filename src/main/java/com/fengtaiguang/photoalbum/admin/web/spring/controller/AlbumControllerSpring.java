package com.fengtaiguang.photoalbum.admin.web.spring.controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
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
	public static String ALBUM_delete_URL = ALBUM_BAST_URL + "delete";
	public static String ALBUM_find_URL = ALBUM_BAST_URL + "find";

	public AlbumControllerSpring() {
		// logger.debug("........AlbumControllerSpring");
		System.out.println(".........");
	}

	@RequestMapping("main")
	public String main() {
		// logger.debug("........album.main");
		// /views/user/user_input.jsp
		return "album/album";
	}

	@RequestMapping(value="find")
	@ResponseBody
	public IQueryAndResult find(AlbumDto album) throws Exception {
		QueryAndResult queryAndResult = new QueryAndResult();
		System.out.println("........list album:" + album);
		String jsonString = post(ALBUM_find_URL, "{}");
		CollectionType listType = mapper.getTypeFactory().constructCollectionType(ArrayList.class, AlbumDto.class);
		List<AlbumDto>list;
		//如果是传统三层的话，直接调用service
		list = mapper.readValue(jsonString, listType);
		QueryAndResultEasyUI queryAndResultEasyUI = new QueryAndResultEasyUI();
		queryAndResultEasyUI.setTotal(list.size());
		queryAndResultEasyUI.setRows(list);
		return queryAndResultEasyUI;
	}

	@RequestMapping("save")
	@ResponseBody
	public Boolean save(AlbumDto album) {
		System.out.println("........save:album" + album);

		try {
			String jsonString = mapper.writeValueAsString(album);
			System.out.println("......jsonString=" + jsonString);
			post(ALBUM_SAVE_URL, jsonString);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return true;
	}

	@RequestMapping("edit")
	@ResponseBody
	public Boolean edit(AlbumDto album) {
		System.out.println("........edit:" + album);
		return true;
	}

	@RequestMapping("view")
	@ResponseBody
	public AlbumDto view(AlbumDto album) {
		System.out.println("........view:" + album);
		return album;
	}

	@RequestMapping("update")
	@ResponseBody
	public Boolean update(AlbumDto album) {
		System.out.println("........update:" + album);
		return true;
	}

	@RequestMapping("delete")
	@ResponseBody
	public Boolean delete(String id) {
		System.out.println("........update:" + id);
		return true;
	}
}
