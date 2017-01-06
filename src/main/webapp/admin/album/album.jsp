<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>ALBUM</title>
<jsp:include page="../commons/jsp/header_easyui.jsp" />
<script type="text/javascript">
	$(function() {
		seajs.use("album/album",function(albumView){
			  albumView.init(${VIEW_JSON});
		});
	});
</script>
<style>
</style>
</head>

<body class="easyui-layout">
	<table id="DATAGRID_ID"></table>
	<div id="TOOLBAR_ID">
		<table id="BUTS_ID"></table>
		<div id="FIND_DIALOG_ID">
			<div style="padding: 5px 5px;">
				<form id="FIND_FORM_ID">
					<table>
						<tr>
							<td><input class="easyui-textbox" name="name"></td>

							<td><a id="FIND_BUT_ID" href="#" class="easyui-linkbutton"
								iconCls="icon-search">查询</a></td>
						</tr>
					</table>
				</form>
			</div>
		</div>
	</div>

</body>
</html>