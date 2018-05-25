<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@include file="/WEB-INF/jsp/common/taglib.jsp" %>
<%@include file="/WEB-INF/jsp/common/common.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html"/>
    <link rel="stylesheet" href="<%=path%>/static/modules/dealerCaution/cautionInfo.css"></link>
    <%@include file="/WEB-INF/jsp/common/head.jsp" %>
    <title>未绑定提醒规则的运营商列表</title>

    <script type="text/javascript">
        var path = "<%=path%>";
        var cautionIds = "${cautionId}";
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
            <button id="refreshBtn" class="btn-icon" type="button">
                <span class="icon i-refresh"></span>刷新
            </button>
            <input id="searchBoxBtn" type="text" style="width: 200px;" maxlength="15" placeholder="运营商名称/手机号"/>
        </div>
    </div>
    <div class="main">
        <div id="addDealerGrid" style="height: 420px; margin: 0"></div>
    </div>
</div>
</body>
</html>
<%@include file="/WEB-INF/jsp/common/foot.jsp" %>
<script type="text/javascript"
        src="<%=path%>/static/common/js/jquery.form.util.js"></script>
<script type="text/javascript"
        src="<%=path%>/static/modules/dealerCaution/addDealerRela.js"></script>
