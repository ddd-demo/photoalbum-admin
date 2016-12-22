package com.fengtaiguang.photoalbum.admin.web.spring.controller;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

public class BaseControllerSpring {
	CloseableHttpClient httpClient = HttpClients.createDefault();

	public String post(String url, String jsonParameters) {
		HttpPost method = new HttpPost(url);
		String body = null;
		if (method != null & jsonParameters != null && !"".equals(jsonParameters.trim())) {
			try {
				// 建立一个NameValuePair数组，用于存储欲传送的参数
				method.addHeader("Content-type", "application/json; charset=utf-8");
				method.setHeader("Accept", "application/json");
				if(!StringUtils.isBlank(jsonParameters)){
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
