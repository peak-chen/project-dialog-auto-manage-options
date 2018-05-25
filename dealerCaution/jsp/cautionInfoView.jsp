<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@include file="/WEB-INF/jsp/common/taglib.jsp" %>
<%@include file="/WEB-INF/jsp/common/common.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html">
    <title>运营商到期提醒规则明细</title>
    <link rel="stylesheet" href="<%=path%>/static/common/traffic/traffic.css"></link>

    <script type="text/javascript">
        var path = "<%=path%>";
    </script>
</head>
<style type="text/css">
    span.num {
        color: #2e8ded;
        font-weight: bold;
    }
</style>

<body style="overflow-x:hidden;">
<div id="showInDialog" style="padding: 25px 20px 0px 30px;">
    <form action="" id="viewForm" class="">
        <input type="hidden" value="${dealerCautionBO.cautionId}" name="cautionId" id="cautionId">
        <div class="control-group">
            <div class="control-label">
                规则名称：
            </div>
            <div class="controls">
                ${dealerCautionBO.cautionName}
            </div>
        </div>
        <div class="control-group">
            <div class="control-label">
                提醒方式：
            </div>
            <div class="controls">
                <c:set value="0" var="i"/>
                <c:forEach items="${dictCautionTypeMap}" var="dictMap">
                    <c:set  value="${i+1}" var="i" />
                    <input type="radio" id="type${i+1}" name="cautionType" disabled="disabled"
                            <c:if test="${dealerCautionBO.cautionType==dictMap.key}"> checked </c:if> />
                    <label for="type${i+1}">${dictMap.value}</label>
                </c:forEach>
            </div>
        </div>
        <div class="control-group">
            <div class="control-label">
                频率配置：
            </div>
            <div class="controls">
                <c:set value="${dealerCautionBO.cautionRules.size()}" var="rulesSize"/>
                <c:choose>
                    <c:when test="${rulesSize>1}">
                        <ol type="1" strat="1">
                            <c:forEach items="${dealerCautionBO.cautionRules}" var="rule">
                                <li>到期前<span class="num"> ${rule.advanceTime} </span>天，
                                    <c:choose>
                                        <c:when test="${rule.orderNum==rulesSize}"><span class="num">每天</span></c:when>
                                        <c:otherwise><span class="num">第${rule.advanceTime}天</span></c:otherwise>
                                    </c:choose>
                                    提醒一次；
                                </li>
                            </c:forEach>
                        </ol>
                    </c:when>
                    <c:when test="${rulesSize==1}">
                        <c:forEach items="${dealerCautionBO.cautionRules}" var="rule">
                            到期前<span class="num"> ${rule.advanceTime} </span>天，<span class="num">每天</span>提醒一次；
                        </c:forEach>
                    </c:when>
                    <c:otherwise>
                        暂未配置提醒规则
                    </c:otherwise>
                </c:choose>
            </div>
        </div>

    </form>
</div>
</body>
</html>
<%@include file="/WEB-INF/jsp/common/foot.jsp" %>




