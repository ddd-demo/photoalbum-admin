package com.fengtaiguang.photoalbum.admin.web.spring.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fengtaiguang.photoalbum.application.dto.AlbumDto;

@RestController
@RequestMapping("/admin/album/")
public class AlbumControllerSpring {

	@RequestMapping("save")
	public Boolean save(AlbumDto albutDto){
		System.out.println(".............save:albutDto="+albutDto);
		return true;
	}
}
