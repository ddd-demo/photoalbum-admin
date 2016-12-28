<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<!-- input dialog -->
	<div style="padding: 10px">
		<form id="${param.INPUT_FORM_ID}">
			<input name="id" type="hidden">
			<div style="margin-bottom: 20px">
				<input class="easyui-textbox" name="name" style="width: 90%"
					data-options="label:'相册名称:',required:true">
			</div>
			<div style="margin-bottom: 20px">
				<input class="easyui-textbox" name=number style="width: 90%"
					data-options="label:'相册排序:',required:true">
			</div>
			<div style="margin-bottom: 20px">
				<input class="easyui-textbox" name="description"
					style="width: 90%; height: 60px"
					data-options="label:'相册描述:',multiline:true">
			</div>
		</form>
	</div>
</body>
</html>