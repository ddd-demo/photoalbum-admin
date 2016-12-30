package com.fengtaiguang.photoalbum.admin.web.spring.controller;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

public class BaseControllerSpring {
	public final static String BAST_OPEN_URL = "http://localhost:8080/photoalbum-open/open/";
	public final static String BAST_URI = "/admin/";
	// 通用访问方法操作名称.
	public final static String MAIN_URL = "main";
	public final static String FIND_URL = "find";
	public final static String VIEW_URL = "view";
	public final static String GET_URL = "get";
	public final static String SAVE_URL = "save";
	public final static String EDIT_URL = "edit";
	public final static String UPDATE_URL = "update";
	public final static String DELETE_URL = "delete";
	private CloseableHttpClient httpClient = HttpClients.createDefault();

	public Map viewUriMap(String MODULE_URI) {
		Map uriMap = new HashMap();
		uriMap.put("FIND_URI", MODULE_URI + FIND_URL);
		uriMap.put("SAVE_URI", MODULE_URI + SAVE_URL);
		uriMap.put("EDIT_URI", MODULE_URI + EDIT_URL);
		uriMap.put("DELETE_URI", MODULE_URI + DELETE_URL);
		uriMap.put("UPDATE_URI", MODULE_URI + UPDATE_URL);
		uriMap.put("VIEW_URI", MODULE_URI + VIEW_URL);

		return uriMap;
	}

	public Map<String, String> viewIdMap() {
		Map<String, String> idsMap = new HashMap();

		idsMap.put("FIND_DIALOG_ID", UUID.randomUUID().toString());
		idsMap.put("FIND_FORM_ID", UUID.randomUUID().toString());
		idsMap.put("DATAGRID_ID", UUID.randomUUID().toString());
		idsMap.put("INPUT_DIALOG_ID", UUID.randomUUID().toString());
		idsMap.put("INPUT_FORM_ID", UUID.randomUUID().toString());
		idsMap.put("EDIT_DIALOG_ID", UUID.randomUUID().toString());
		idsMap.put("EDIT_FORM_ID", UUID.randomUUID().toString());
		idsMap.put("VIEW_DIALOG_ID", UUID.randomUUID().toString());
		idsMap.put("VIEW_FORM_ID", UUID.randomUUID().toString());
		// Iterator<String> it1 = idsMap.keySet().iterator();
		// Map<String, String> idsMapHTML = new HashMap();
		// while (it1.hasNext()) {
		// String key = it1.next();
		// idsMapHTML.put(key+"_H", idsMap.get(key));
		// }
		// Iterator<String> it2 = idsMap.keySet().iterator();
		// while (it2.hasNext()) {
		// String key = it2.next();
		// idsMap.put(key,"#"+ idsMap.get(key));
		// }
		// idsMap.putAll(idsMapHTML);
		return idsMap;
	}

	public String post(String url, String jsonParameters) {
		HttpPost method = new HttpPost(url);
		String body = null;
		if (method != null & jsonParameters != null && !"".equals(jsonParameters.trim())) {
			try {
				// 建立一个NameValuePair数组，用于存储欲传送的参数
				method.addHeader("Content-type", "application/json; charset=utf-8");
				method.setHeader("Accept", "application/json");
				if (!StringUtils.isBlank(jsonParameters)) {
					method.setEntity(new StringEntity(jsonParameters, Charset.forName("UTF-8")));
				}
				HttpResponse response = httpClient.execute(method);
				int statusCode = response.getStatusLine().getStatusCode();
				// Read the response body
				body = EntityUtils.toString(response.getEntity());
			} catch (IOException e) {
				e.printStackTrace();
			} finally {

			}
		}
		return body;
	}

}
