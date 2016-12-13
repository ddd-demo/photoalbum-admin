package com.fengtaiguang.photoalbum.admin.web.controller;

import java.io.IOException;

import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

public class BaseControllerSpring {

	public String post_jsonString(String url) throws ClientProtocolException, IOException {
		CloseableHttpClient httpclient = HttpClients.createDefault();
		String entityString = null;
		try {
			HttpPost httpPost = new HttpPost(url);
			CloseableHttpResponse response = httpclient.execute(httpPost);
			try {
				System.out.println("------------------post----------------------");
				System.out.println(response.getStatusLine());
				entityString = EntityUtils.toString(response.getEntity());
				System.out.println("....entityString=" + entityString);
				httpPost.abort();
			} finally {
				response.close();
			}
		} finally {
			httpclient.close();
		}
		return entityString;
	}
	public String post_jsonObject(String url) throws ClientProtocolException, IOException {
		CloseableHttpClient httpclient = HttpClients.createDefault();
		String entityString = null;
		try {
			HttpPost httpPost = new HttpPost(url);
			CloseableHttpResponse response = httpclient.execute(httpPost);
			try {
				System.out.println("------------------post----------------------");
				System.out.println(response.getStatusLine());
				entityString = EntityUtils.toString(response.getEntity());
				System.out.println("....entityString=" + entityString);
				// User user = gson.fromJson(entityString, User.class);
				// System.out.println("user:" + user);
				httpPost.abort();
			} finally {
				response.close();
			}
		} finally {
			httpclient.close();
		}
		return entityString;
	}
	public String post_send_json(String url,Object param) throws ClientProtocolException, IOException {
		CloseableHttpClient httpclient = HttpClients.createDefault();
		String entityString = null;
		
		try {
			HttpPost httpPost = new HttpPost(url);
			CloseableHttpResponse response = httpclient.execute(httpPost);
			try {
				System.out.println("------------------post----------------------");
				System.out.println(response.getStatusLine());
				entityString = EntityUtils.toString(response.getEntity());
				System.out.println("....entityString=" + entityString);
				// User user = gson.fromJson(entityString, User.class);
				// System.out.println("user:" + user);
				httpPost.abort();
			} finally {
				response.close();
			}
		} finally {
			httpclient.close();
		}
		return entityString;
	}
	public static void main(String[] args) {
		 ObjectMapper mapper = new ObjectMapper();
		 
	}
}
