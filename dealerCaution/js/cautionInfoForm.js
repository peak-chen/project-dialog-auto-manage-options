//输入框处理(设置提示框限制的大小值,只需要设置大于size>1的情况)
function copy(value,order) {
    var size=$("ol li").length;
    //设置输入的数字
    var lastLi=$("ol li:last").index();
    if(lastLi!=order){
        $("ol li").eq(order).children("span").empty();
        $("ol li").eq(order).children("span").html(" 第"+value+"天");
    }


    //输入验证要通过
    var selfInput=$("ol li").eq(order).children("div").children("input");
    var selfValue=Number(selfInput.val());
    if(!selfInput.validate()||selfValue<1){
        return false;
    }
    if(size>1){
        //第一个
        if(order===0){
            var bot=Number(order+1);
            var botInput=getOtherObj(bot);
            var botValue=Number(botInput.val());
            botInput.attr("maxValue",selfValue-1);
            selfInput.attr("minValue",botValue+1);
            //最后一个
        }else if(order===size-1){
            var top=Number(order-1);
            var topInput=getOtherObj(top);
            topInput.attr("minValue",selfValue+1);
            if(getOtherVal(top)>1){
                selfInput.attr("maxValue",getOtherVal(top)-1);
            }
            selfInput.attr("minValue",1);
            //中间部分
        } else{
            var bot=Number(order+1);
            var top=Number(order-1);
            var botInput=getOtherObj(bot);
            var topInput=getOtherObj(top);
            botInput.attr("maxValue",selfValue-1);
            topInput.attr("minValue",selfValue+1);

        }
    }

}


//添加按钮处理
function addRow(index){
    //再次验证输入部分
    if(!$("#addEditForm").validate()){
        return false;
    }
    //本行值等于1则不给新增行
    if(getSelfVal()==="1"){
        st.layer.alert('最小值为1天,已达到规则添加上限',{icon : 0, time : 2000});
        return false;
    }

    var rowInput="<li>到期前 <input name=\"advanceTime\" class=\"auto-input\" value=\"\" minValue=\"1\" " +
        "vtype=\"number\" allowDecimals=\"false\" type=\"text\" required=\"true\"   " +
        "oninput=\"copy(this.value,$(this).parent().parent().index())\" onkeyup =\"copy(this.value,$(this).parent().parent().index())\" " +
        "promptPosition=\"topLeft\"  />天，<span class=\"num\"> 每天</span> 提醒一次； " +
        "<button type=\"button\" name=\"delBtn\" class=\"sty\" title=\"删除\" onclick=\"delRow($(this).parent().index());\">" +
        "<span class=\"icon i-del\"></span></button> <button type=\"button\" name=\"addBtn\" class=\"sty\" title=\"添加\" " +
        "onclick=\"addRow($(this).parent().index()+1);\"><span class=\"icon i-add\"></span></button></li>";
    //删除按钮
    var delbtnHtm="<button type=\"button\" name=\"delBtn\" class=\"sty\" title=\"删除\" onclick=\"delRow($(this).parent().index());\"><span class=\"icon i-del\"></span></button>";

    //如果不存在删除按钮则新增上一行删除按钮
    var delLength=$("ol li button[name='delBtn']");
    if(typeof (delLength)==="undefined"||delLength.length<1){
        $("ol li:last-child button:last-child").before(delbtnHtm);
    }
    //删除上一行添加按钮
    $("ol li:last-child button:last-child").remove();
    //修改上一行的显示文字
    $("ol li:last-child span.num").empty();
    $("ol li:last-child span.num").html(" 第"+getSelfVal()+"天");
    //添加新的一行
    $("ol li:last").after(rowInput);
    //修改新一行的提示信息
    var selfInput=$("ol li").eq(index).children("input");
    var selfValue=Number(selfInput.val());
    if(index===$("ol li:last-child").index()){
        var top=Number(index-1);
        var topInput=getOtherObj(top);
        topInput.attr("minValue",selfValue+1);
        if(getOtherVal(top)>1){
            selfInput.attr("maxValue",getOtherVal(top)-1);
        }
        selfInput.attr("minValue",1);
    }


}


//获取 本行的input的值
function getSelfVal(){
    var val=$("ol li:last-child").children("input").val();
    if(typeof(val)==="undefined" ){
        val=$("ol li:last-child").children("div").children("input").val();
    }
    return val;
}
//获取其他行input的值
function getOtherVal(index){
    var val=$("ol li").eq(index).children("input").val();
    if(typeof(val)==="undefined" ){
        val=$("ol li").eq(index).children("div").children("input").val();
    }
    return val;
}
//获取其他行input的值
function getOtherObj(index){
    var val=$("ol li").eq(index).children("input").val();
    var obj=$("ol li").eq(index).children("input");
    if(typeof(val)==="undefined" ){
        obj=$("ol li").eq(index).children("div").children("input");
    }
    return obj;
}

//删除按钮处理
function delRow(indexNum){

    //再次验证输入部分
    if(!$("#addEditForm").validate()){
        return false;
    }
    //新增按钮
    var addbtnHtm=" <button type=\"button\" name=\"addBtn\" class=\"sty\" title=\"添加\" onclick=\"addRow($(this).parent().index()+1);\">" +
        "<span class=\"icon i-add\"></span></button>";

    //1.(li的长度=1)验证输入部分的长度(只有一行不能删除,并去掉删除图标)
    if($("ol li").length===1){
        st.layer.alert('至少保留一条提醒规则',{icon : 0, time : 2000});
        return false;

        //2.(li的长度=2)删掉后只剩一行
    } else if($("ol li").length===2){
        //删除本行数据
        $("ol li").eq(indexNum).remove();
        //修改最后一行的提示信息
        getOtherObj($("ol li:last-child").index()).attr("minValue",1);
        //如果不存在删除按钮则新增上一行删除按钮
        var addLength=$("ol li button[name='addBtn']");
        if(typeof (addLength)==="undefined"||addLength.length<1){
            $("ol li:last-child button:last-child").before(addbtnHtm);
        }
        //修改最后一行的显示文字
        $("ol li:last-child span.num").empty();
        $("ol li:last-child span.num").html(" 每天");
        //去掉最后一行的删除按钮
        $("ol li button:last-child").remove();

        //3.(li的长度>2)多条中删除某一行,与删除顺序有关
    }else if($("ol li").length>2){
        var last=$("ol li:last-child").index();
        //1).删除第一条数据
        if(indexNum===0){
            //删除本行数据
            $("ol li").eq(indexNum).remove();
            //去掉下一行的maxValue属性(删除后变为第一行)
            getOtherObj(0).removeAttr("maxValue");

            //2).删除最后一条数据
        }else if(indexNum===last){
            //删除本行数据
            $("ol li").eq(indexNum).remove();
            //修改上一行的minValue的值为1(删除后变为最后一行)
            getOtherObj($("ol li:last-child").index()).attr("minValue",1);
            //修改上一行的新增图标及文字(删除后变为最后一行)
            var addLength=$("ol li button[name='addBtn']");
            if(typeof (addLength)==="undefined"||addLength.length<1){
                $("ol li:last-child button").after(addbtnHtm);
            }
            $("ol li:last-child span.num").empty();
            $("ol li:last-child span.num").html(" 每天");

            //3).删除中间一条数据
        }else if(indexNum>0&&indexNum<last){
            //删除本行数据
            $("ol li").eq(indexNum).remove();
            //修改上一行的minValue为下一行值+1(删除后变为上一行)
            getOtherObj(indexNum-1).attr("minValue",Number(getOtherVal(indexNum))+1);
            //修改下一行的maxValue为上一行值-1(删除后变为本行)
            getOtherObj(indexNum).attr("maxValue",Number(getOtherVal(indexNum-1))-1);
        }

        //4.(li的长度<1)无效删除
    }else{
        return false;
    }

}