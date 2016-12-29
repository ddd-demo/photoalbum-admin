<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>user</title>
<jsp:include page="../commons/jsp/header_easyui.jsp" />
<!-- 本模块的脚本文件 -->
<script type="text/javascript" src="${webBase}album.js"></script>
<script type="text/javascript">
	var ${VIEW_ID};
	$(function() {
		${VIEW_ID}=new AlbumView(${VIEW_JSON})
		${VIEW_ID}.find();
		$(body).unload(function(){
			${VIEW_ID}.destroy()
		  });
	});
</script>
</head>

<body class="easyui-layout" data-options="border:false">
	<table id="${DATAGRID_ID_H}"></table>
	<!--find form -->
	<div id="${FIND_DIALOG_ID_H}">
		<div style="padding: 2px 5px;">
			<form id="${FIND_FORM_ID_H}">
				<table cellspacing="0" cellpadding="0">
					<tr>
						<td>日期: <input name="beginDate" class="easyui-datebox"
							style="width: 110px"></td>
						<td>至: <input name="endDate" class="easyui-datebox"
							style="width: 110px"></td>
						<td><a href="#" class="easyui-linkbutton"
							iconCls="icon-search" onclick="">查询</a></td>
					</tr>
				</table>
			</form>
		</div>
	</div>
	
</body>
</html>