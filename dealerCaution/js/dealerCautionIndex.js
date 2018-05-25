var cautionGrid = null;
var cautionGridUrl = path + "/cautionInfo/queryCautionGridData";

$(document).ready(function() {
	initSearchBox();
	initCautionGrid();
});

var gridMethod = {
	/**
	 * 表格查询
	 * 
	 * @param cautionName
	 */
	searchGrid : function(cautionName) {
		cautionGrid.jqGrid('setGridParam', {
			postData : {
				'cautionName' : cautionName
			},
			page : 1
		}).trigger('reloadGrid');
	},
	/**
	 * 表格刷新
	 */
	reloadGrid : function() {
		if (cautionGrid) {
			cautionGrid.reloadGrid();
		}
	}
};

function initSearchBox() {
	$('#searchBox').searchbox(function(cautionName) {
        if(park.util.hasIllegeChar(cautionName)){
            st.layer.alert(default_hit_message, {
                icon : 0,
                time : default_close_time
            });
            return ;
        }
		gridMethod.searchGrid(cautionName);
	});
}

function openDialog(url,title) {
	st.layer.iframe({// 此处进行了封装快捷调用，原方式是layer.open({type:2})
		title : title,
		btn : [ '确定', '取消' ],// 按照UI规范调整了弹出框底部按钮区域样式
		area : [ 460, 300 ],
		fix : true, // 固定
		maxmin : false,// 显示最大化最小化按钮
		content : url,
		yes : function(index, layero) {// 点击确定按钮的回调函数
			saveData(index, layero);
		},
		cancel : function() {// 点击取消按钮的回调函数

		}
	});
}

function saveData(index, layero) {
	// 获取弹出框对象，可操作内部dom及其js
	var winNameAndId = layero.find('iframe')[0]['name'];
	var iframeWin = window.frames[winNameAndId];
	var data = iframeWin.getFormData();
	if (data == null) {
		return;
	}
	$.ajax({
		type : 'POST',
		url : path + '/cautionInfo/saveOrUpdate',
		contentType : "application/json",
		dataType : 'json',
		data : JSON.stringify(data),
		success : function(rc) {
            btnRefresh();
			if (rc.successful) {
				st.layer.alert(rc.successInfo, {icon : 1, time : default_close_time});
			}
		},
        error: function (data) {
            btnRefresh();
            st.layer.error(rc.errorInfo, {icon: 0, time: default_close_time});
        }
	});
    // 关闭弹出框
    st.layer.close(index);
}

function btnAdd() {
	openDialog(path + '/cautionInfo/add','添加提醒规则');
}

function btnEdit() {
    var ids = cautionGrid.jqGrid('getGridParam', 'selarrrow');
	var selectId = cautionGrid.jqGrid('getGridParam', 'selrow');
    if(ids===null||ids.length<1){
        st.layer.info('请选择一条要修改的提醒规则',{time : default_close_time,shade : [0.3,'#393D49' ]});
        return false;
    } else if(ids.length>1){
        st.layer.info('一次只能修改一条提醒规则',{time : default_close_time,shade : [0.3,'#393D49' ]});
        return false;
    }else{
    	if(selectId!=null){
            openDialog(path + '/cautionInfo/edit?cautionId=' + selectId,'修改提醒规则');
		}
	}

}

function btnDel() {
	var ids = cautionGrid.jqGrid('getGridParam', 'selarrrow');
    var selectId = cautionGrid.jqGrid('getGridParam', 'selrow');
    if(ids===null||ids.length<1){
        st.layer.info('请选择一条要删除的提醒规则',{time : default_close_time,shade : [0.3,'#393D49' ]});
        return false;
	}else if(ids.length>1) {
        st.layer.info('一次只能删除一条提醒规则', {time: default_close_time, shade: [0.3, '#393D49']});
        return false;

    }

    if(selectId===null||selectId.length<0){
        st.layer.info('请选择一条要删除的提醒规则',{time : default_close_time,shade : [0.3,'#393D49' ]});
        return false;
    }
    var rowData = cautionGrid.jqGrid('getRowData',selectId);
    //已绑定运营商的规则不可删除
    if(rowData.dealerUseNum>0){
        st.layer.info('只能删除未绑定运营商的提醒规则',{time : default_close_time,shade : [0.3,'#393D49' ]});
        return false;
    }else{
        st.layer.confirm('确定删除所选规则？', {
            time: 0,
            closeBtn: 2,
            btn: ['确定', '取消'],
            yes: function (index, layero) {
                $.ajax({
                    url: path + '/cautionInfo/deleteCautionInfoAndCautionRule', // 跳转到 action
                    data: JSON.stringify({
                        "cautionId": selectId
                    }),
                    type: 'post',
                    cache: false,
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (rc) {
                        if (rc.successful) {
                            btnRefresh();// 刷新表格
                            st.layer.alert("删除成功", {icon: 1, time: default_close_time});
                        } else {
                            btnRefresh();// 刷新表格
                            st.layer.error(rc.errorInfo, {icon: 0, time: default_close_time});
                        }
                    },
                    error: function (data) {
                        btnRefresh();// 刷新表格
                        st.layer.error('系统出错啦', {icon: 0, time: default_close_time});
                    }
                });
                // 关闭弹出框
                st.layer.close(index);
            }
        });
	}

}


function btnRefresh() {
	if (cautionGrid) {
		gridMethod.reloadGrid();
	}
}

function initCautionGrid() {
	var gridConfig = {

		colModel : [ {
			name : "cautionId",
			index : "cautionId",
			hidden : true,
			align : "left"
		}, {
			name : "cautionName",
			index : "cautionName",
			width : 130,
			label : "规则名称",
			align : "left"
		}, {
			name : "createTime",
			index : "createTime",
			width : 120,
			label : "创建时间",
			align : "left"
		}, {
			name : "createPersonStr",
			index : "createPersonStr",
			width : 60,
			label : "创建人",
            align : "left"
		}, {
			name : "modifyTime",
			index : "modifyTime",
			label : "修改时间",
            align : "left",
			width : 120
		}, {
			name : "modifyPersonStr",
			index : "modifyPersonStr",
			label : "修改人",
            align : "left",
			width : 60
        }, {
            name : "cautionTypeStr",
            index : "cautionTypeStr",
            label : "提醒方式",
            align : "left",
            width : 60
        }, {
            hidden : true,
            name : "dealerUseNum",
            index : "dealerUseNum",
            label : "绑定规则的运营商数量",
            align : "right",
            width : 60,
			title :false
        }/*, {
            name : "dealerUseNumStr",
            index : "dealerUseNumStr",
            label : "绑定规则的运营商数量",
            align : "right",
            width : 60,
            title :false,
            formatter : dealerUseNumStrFormatter
        }*/, {
			name : "ruleDetail",
			index : "ruleDetail",
			label : "规则详情",
            align : "center",
			width : 60,
            title :false,
			formatter : ruleDetailFormatter
		} ],
        jsonReader : {
            id: "cautionId",
            root: "results",// 展示的查询结果
            page: "pageNo",// 当前页
            total: "totalPage",// 总页数
            records: "totalRecord",// 查出的记录数
            repeatitems: false
        },
        prmNames : {
			"page" : "pageNo",// 表示请求页码的参数名称
            "rows" : "pageSize"// 表示请求行数的参数名称
		},
        mtype : "post",
        viewrecords : true,
        sortable : false,
        emptyrecords : "暂无数据",
        embellish : true,// 是否启用优化，包含对复选框和滚动条的优化，若启用会有一定的性能开销，默认为true启用优化
        isAsycnTotal : false,// 是否异步加载总数
        rownumbers : true,
        rownumWidth : 45,
        pager : "pagination",
        url : cautionGridUrl,
	    headertitles: true


	};
	cautionGrid = $("#cautionGrid").grid(gridConfig);
}

//表格格式化运营商使用数量
function dealerUseNumStrFormatter(cellvalue, options, rowObject) {
    var opt='title="单击添加未绑定规则的运营商" onclick="initAddRela(\'' + rowObject.cautionId +'\',\''+rowObject.cautionName + '\');">添加绑定';
    if(rowObject.dealerUseNum>0) {
        opt='title="单击查看已绑定规则的运营商" onclick="openUseDetail(\'' + rowObject.cautionId +'\',\''+rowObject.cautionName + '\');">已绑定' + rowObject.dealerUseNum + '个';
    }

    return '<a herf="javascript:void(0);"  id="a' + options.rowId +
           '" style="cursor: pointer;" data-type="1" ' +opt+ '</a>';
}

//运营商使用明细
function openUseDetail(cautionId,cautionName){
    st.layer.iframe({
        title : '绑定<span style="color:lemonchiffon;font-weight: bold;">'+cautionName+'</span>的运营商列表',
        area : [ 1100, 500 ],
        fix : true, // 固定
        content : path + '/cautionInfo/viewCautionInfoDetail?cautionId=' + cautionId+'&cautionName='+cautionName,
        yes : function(index, layero) {
        },
        cancel : function(index) {// 点击取消按钮的回调函数
            gridMethod.reloadGrid();
        }
    });
}

function initAddRela(cautionId,cautionName){
    parent.st.layer.iframe({
        title : '未绑定规则的运营商列表',
        closeBtn: 2,
        btn : ['确定','取消'],
        area : [ 1100, 500 ],
        fix : true, // 固定
        content : path + '/cautionInfo/addDealerRelaPage?cautionId=' + cautionId,
        yes : function(index, layero) {
            //获取弹出框对象，可操作内部dom及其js
            var winNameAndId = layero.find('iframe')[0]['name'];
            var iframeWin = parent.window.frames[winNameAndId];
            //调用父页面弹框的子页面的函数
            iframeWin.addDealerRelaAction(cautionName);
        },
        cancel : function(index) {
            gridMethod.reloadGrid();
        }
    });
}

//表格格式化规则详情查看
function ruleDetailFormatter(cellvalue, options, rowObject) {
    var returnvalue = '<a herf="javascript:void(0);"  id="a' + options.rowId
        + '" style="cursor: pointer;" data-type="1" onclick="openRuleDetail(\''+rowObject.cautionId+'\');">查看</a>';
    return returnvalue;
}

//规则详情查看
function openRuleDetail(cautionId) {
    st.layer.iframe({// 此处进行了封装快捷调用，原方式是layer.open({type:2})
        title : "规则详情",
        area : [420,250],
        shadeClose: true,//点击背景蒙层关闭弹框
        maxmin : false,// 显示最大化最小化按钮
        closeBtn: 1,//只显示关闭按钮
        content : path + '/cautionInfo/view?cautionId=' + cautionId,
        cancel : function(index) {// 点击取消按钮的回调函数
        },
        success: function(index){
        }
    });


}