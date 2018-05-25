<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@include file="/WEB-INF/jsp/common/taglib.jsp" %>
<%@include file="/WEB-INF/jsp/common/common.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html">
    <title>运营商到期提醒规则配置</title>
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
    button.sty {
        height: 21px;
        width: 30px;
        padding: 0px 0px 0px 4px !important;
    }
    input[name=advanceTime]{
        height: 10px !important;
        width: 20px !important;
    }

    /**添加图标**/
    .btn-icon .icon.i-add,
    .icon.i-add {
        background-position: -4px -4px !important;
    }
    .btn-icon:hover .icon.i-add,
    .btn-icon:active .icon.i-add,
    .icon:hover.i-add,
    .icon:active.i-add {
        background-position: -4px -38px!important;
    }

    /**删除图标**/
    .icon.i-del {
        background-position: -4px -208px!important;
    }
    .btn-icon:hover .icon.i-del,
    .btn-icon:active .icon.i-del,
    .icon:hover.i-del,
    .icon:active.i-del {
        background-position: -4px -242px!important;
    }


</style>
<body style="overflow-x:hidden;">
<div id="showInDialog" style="padding: 25px 20px 0px 30px;">
    <form action="" id="addEditForm" class="">
        <input type="hidden" value="${dealerCautionBO.cautionId}" name="cautionId" id="cautionId">
        <div class="control-group">
            <div class="control-label">
                <em>*</em>规则名称：
            </div>
            <div class="controls">
                <input class="auto-input" maxlength="20" value=" ${dealerCautionBO.cautionName}"
                       id="cautionName" name="cautionName" vtype="common" type="text" required="true"
                       promptPosition="topLeft"/>
            </div>
        </div>
        <div class="control-group">
            <div class="control-label">
                <em>*</em>提醒方式：
            </div>
            <div class="controls">
                <c:set value="0" var="i"/>
                <c:forEach items="${dictCautionTypeMap}" var="dictMap">
                    <c:set  value="${i+1}" var="i" />
                    <input type="radio" id="type${i}" name="cautionType" value="${dictMap.key}"
                    <c:choose>
                        <c:when test="${dealerCautionBO.cautionType==dictMap.key}">
                            checked />
                        </c:when>
                        <c:otherwise>
                            <c:if test="${1==dictMap.key}"> checked </c:if> />
                        </c:otherwise>
                    </c:choose>
                    <label for="type${i}">${dictMap.value}</label>
                </c:forEach>
            </div>
        </div>
        <div class="control-group">
            <div class="control-label">
                <em>*</em>频率配置：
            </div>
            <div class="controls" id="ruleDiv">
                <c:set value="${dealerCautionBO.cautionRules}" var="cautionRules" />
                <c:set value="${dealerCautionBO.cautionRules.size()}" var="rulesSize"/>
                <c:set value="-1" var="j"/>
                <c:choose>
                    <c:when test="${rulesSize>1}">
                        <ol type="1" strat="1">
                            <c:forEach items="${dealerCautionBO.cautionRules}" var="rule">
                                <c:set value="${j+1}" var="j"/>
                                <li>到期前
                                        <input name="advanceTime" class="auto-input" value="${rule.advanceTime}"
                                               vtype="number" allowDecimals="false"
                                               <%--初始化设置输入框大小值限制验证--%>
                                                <c:choose>
                                                    <c:when test="${j==0}">minValue="${cautionRules.get(j+1).advanceTime+1}"</c:when>
                                                    <c:when test="${j==rulesSize-1}">minValue="1" maxValue="${cautionRules.get(j-1).advanceTime-1}"</c:when>
                                                    <c:when test="${j<rulesSize-1&&j>0}">minValue="${cautionRules.get(j+1).advanceTime+1}"  maxValue="${cautionRules.get(j-1).advanceTime-1}"</c:when>
                                                    <c:otherwise>
                                                        minValue="1"
                                                    </c:otherwise>
                                                </c:choose>
                                               type="text" required="true"   oninput="copy(this.value,$(this).parent().parent().index())" onkeyup ="copy(this.value,$(this).parent().parent().index())"
                                               promptPosition="topLeft" />天，
                                    <%--设置提醒类型--%>
                                    <c:choose>
                                        <c:when test="${rule.orderNum==rulesSize}"><span class="num">每天</span></c:when>
                                        <c:otherwise><span class="num">第${rule.advanceTime}天</span></c:otherwise>
                                    </c:choose>
                                    提醒一次；
                                    <%--设置添加或删除规则实体的按钮--%>
                                    <c:if test="${rulesSize>1}">
                                        <button type="button" name="delBtn" class="sty" title="删除" onclick="delRow($(this).parent().index());"><span class="icon i-del"></span></button>
                                    </c:if>
                                    <c:if test="${rule.orderNum==rulesSize}">
                                        <button type="button" name="addBtn" class="sty" title="添加" onclick="addRow($(this).parent().index()+1);"><span class="icon i-add"></span></button>
                                    </c:if>

                                </li>
                            </c:forEach>
                        </ol>
                    </c:when>
                    <c:when test="${rulesSize==1}">
                      <ol type="1" strat="1">
                        <c:forEach items="${dealerCautionBO.cautionRules}" var="rule">
                            <li>到期前
                                <input name="advanceTime" class="auto-input" value="${rule.advanceTime}"
                                       vtype="number" allowDecimals="false" minValue="1"
                                       type="text" required="true"   oninput="copy(this.value,$(this).parent().parent().index())" onkeyup ="copy(this.value,$(this).parent().parent().index())"
                                       promptPosition="topLeft" />天，
                                <span class="num">每天</span>提醒一次；
                                <button type="button" name="addBtn" class="sty" title="添加" onclick="addRow($(this).parent().index()+1);"><span class="icon i-add"></span></button>
                            </li>
                        </c:forEach>
                      </ol>
                    </c:when>
                    <c:otherwise>
                        <ol type="1" strat="1">
                            <li>到期前
                                <input name="advanceTime" class="auto-input" value=""
                                       vtype="number" allowDecimals="false" minValue="1"
                                       type="text" required="true"   oninput="copy(this.value,$(this).parent().parent().index())" onkeyup ="copy(this.value,$(this).parent().parent().index())"
                                       promptPosition="topLeft" />天，
                                <span class="num">每天</span>提醒一次；
                                <button type="button" name="addBtn" class="sty" title="添加" onclick="addRow($(this).parent().index()+1);"><span class="icon i-add"></span></button>
                            </li>
                        </ol>
                    </c:otherwise>
                </c:choose>
            </div>
        </div>

    </form>
</div>
</body>
</html>
<%@include file="/WEB-INF/jsp/common/foot.jsp" %>
<script type="text/javascript" src="<%=path%>/static/common/js/jquery.form.util.js"></script>
<script type="text/javascript" src="<%=path%>/static/modules/dealerCaution/cautionInfoForm.js"></script>

<script type="text/javascript">

    //验证输入的数据
    function validForm(){
        //再次验证输入部分
        if(!$("#addEditForm").validate()){
            return false;
        }
        //验证规则名称
        if(typeof($('#cautionName').val())==="undefined" ||$('#cautionName').val()===""){
            st.layer.alert('规则名称不能为空',{icon : 0, time : 2000});
            return false;
        }
        //验证提醒方式
        var caType=$('input:radio:checked').val();
        if(typeof(caType)==="undefined" ||caType===""){
            st.layer.alert('请选择提醒方式',{icon : 0, time : 2000});
            return false;
        }
        //验证频率配置
        $('input[name="advanceTime"]').each(
            function(){
                if($(this).val()===""){
                    return false;
                }
            }
        );

        return true;
    }


    //收集要处理的数据
    function getFormData() {

        if(!validForm()){
            return null;
        }
        var adTimes=[];
        $('input[name="advanceTime"]').each(
            function(){
                if($(this).val()===""){
                    return null;
                }else{
                    adTimes.push($(this).val());
                }
            }
        );

        var data = {
            cautionId : $("#cautionId").val(),
            cautionName : $("#cautionName").val(),
            cautionType : $("input[type='radio']:checked").val(),
            advanceTimes : adTimes
        };
        return data;
    }
</script>