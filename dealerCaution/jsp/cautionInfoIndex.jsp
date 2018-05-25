<%@ page language="java" contentType="text/html; charset=UTF-8"
		 pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/common/taglib.jsp"%>
<%@include file="/WEB-INF/jsp/common/common.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=8">
	<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
	<link rel="stylesheet"	href="<%=path%>/static/modules/dealerCaution/cautionInfo.css"></link>
	<%@include file="/WEB-INF/jsp/common/head.jsp"%>
	<title>运营商到期提醒配置</title>
	<script >
        var path = "<%=path%>";
	</script>

</head>
<html>
<body>
<div class="wrap">
	<div class="top">
		<div class="tool-bar">
			<button id="btnAdd" class="btn-icon" type="button" style="margin-left: 10px;" onclick="btnAdd()">
				<span class="icon i-add"></span>添加
			</button>
			<button id="btnEdit" class="btn-icon" type="button"	 onclick="btnEdit()">
				<span class="icon i-edit"></span>修改
			</button>
			<button id="btnDel" class="btn-icon" type="button" 	onclick="btnDel()">
				<span class="icon i-del"></span>删除
			</button>
			<button id="btnRefresh" class="btn-icon" type="button" onclick="btnRefresh()">
				<span class="icon i-refresh"></span>刷新
			</button>
			<input id="searchBox" type="text" style="width: 200px;"	maxlength="15" placeholder="规则名称" />
		</div>
	</div>
	<div class="main">
		<div id="cautionGrid" style="height: 100%;"></div>
	</div>
</div>
</body>
</html>
<%@include file="/WEB-INF/jsp/common/foot.jsp"%>
<script type="text/javascript" src="<%=path%>/static/common/js/jquery.form.util.js"></script>
<script type="text/javascript" src="<%=path%>/static/modules/dealerCaution/dealerCautionIndex.js"></script>