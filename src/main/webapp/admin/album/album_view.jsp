<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>
<body>
	<!-- view dialog -->
	<div style="padding: 10px">
		<form id="${param.FORM_ID}">
			<table>
				<tr>
					<td>相册名称</td>
					<td><label name="name"></label></td>
				</tr>
				<tr>
					<td>相册排序:</td>
					<td><label name="number"></label></td>
				</tr>
				<tr>
					<td>相册描述</td>
					<td><label name="description"></label></td>
				</tr>
			</table>
		</form>
	</div>
</body>
</html>