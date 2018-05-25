<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@include file="/WEB-INF/jsp/common/taglib.jsp" %>
<%@include file="/WEB-INF/jsp/common/common.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html"/>
    <link rel="stylesheet" href="<%=path%>/static/modules/dealerCaution/cautionInfo.css"></link>
    <%@include file="/WEB-INF/jsp/common/head.jsp" %>
    <title>运营商到期提醒规则使用详情</title>

    <script type="text/javascript">
        var path = "<%=path%>";
        var cautionId = "${cautionId}";
        var cautionName = "${cautionName}";
    </script>
</head>
<style type="text/css">
    body {
        padding: 5px 5px 10px 5px;
        background-color: #fff;
    }
</style>
<body>
<div class="wrap">
    <div class="top">
        <div class="tool-bar" >
            <button id="addDealer" class="btn-icon" type="button">
                <span class="icon i-add"></span>添加绑定
            </button>
            <button id="delDealer" class="btn-icon" type="button">
                <span class="icon i-del"></span>解除绑定
            </button>
            <button id="refreshDealer" class="btn-icon" type="button">
                <span class="icon i-refresh"></span>刷新
            </button>
            <input id="searchBox" type="text" style="width: 200px;" maxlength="15" placeholder="运营商名称/手机号"/>
        </div>
    </div>
    <div class="main">
        <div id="simplePagerGrid" style="height: 420px; margin: 0"></div>
    </div>
</div>
</body>
</html>
<%@include file="/WEB-INF/jsp/common/foot.jsp" %>
<script type="text/javascript"
        src="<%=path%>/static/common/js/jquery.form.util.js"></script>
<script type="text/javascript"
        src="<%=path%>/static/modules/dealerCaution/cautionInfoDetail.js"></script>
