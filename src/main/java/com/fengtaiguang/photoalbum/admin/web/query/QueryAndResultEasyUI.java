package com.fengtaiguang.photoalbum.admin.web.query;

import java.util.List;

import com.fengtaiguang.ddd.framwork.domain.vo.query.IQueryAndResult;

public class QueryAndResultEasyUI implements IQueryAndResult {

	private int total;
	private List rows;

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public List getRows() {
		return rows;
	}

	public void setRows(List rows) {
		this.rows = rows;
	}
}