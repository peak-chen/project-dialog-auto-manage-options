// 页面初始化函数
var simplePagerGrid;
var cautionInfoDetailQueryUrl = "getDealerBindDetailGridData?cautionId="+ cautionId;

var simplePagerGridCfg = {
    multiselect : true,
    prmNames : {
	"page" : "pageNo",
	"rows" : "pageSize"
    },
    jsonReader : {
	root : "results",
	id : "dealerRelaId",
	page : "pageNo",
	records : "totalRecord",
	total : "totalPage"
    },
    url : cautionInfoDetailQueryUrl,
    colModel : [ {
	name : "dealerRelaId",
	index : "dealerRelaId",
	hidden : true,
	align : "center"
    }, {
	name : "dealerName",
	index : "dealerName",
	align : "left",
	label : "运营商名称",
	width : 120
    }, {
	name : "phone",
	index : "phone",
	align : "left",
	label : "电话号码",
	width : 100
    }, {
	name : "email",
	index : "email",
	align : "left",
	label : "邮箱地址",
	width : 100
    }, {
	name : "bindTime",
	index : "bindTime",
	align : "left",
	label : "绑定时间",
	width : 120
    }],
    ajaxGridOptions: {
	timeout : 60000, //超时时间设置，单位毫秒
     },
    embellish : true,// 是否启用优化，包含对复选框和滚动条的优化，若启用会有一定的性能开销，默认为true启用优化
    isAsycnTotal : false,// 是否异步加载总数
    gridview : true,// 设置为true将提高5~10倍的显示速度。但不能再使用treeGrid, subGrid,
    rownumbers : true,
    rownumWidth : 30,
    pager : "inner_page"
};




$(function() {

    simplePagerGrid = $("#simplePagerGrid").grid(simplePagerGridCfg);
    // 查询
    initSearchBox();

    //刷新
    $("#refreshDealer").click(function() {
        if (simplePagerGrid) {
            simplePagerGrid.reloadGrid();
        }
    });

    // 添加绑定
    initAddRela(cautionId);

    //解除绑定
	initDelRela();

});

function initSearchBox() {
    $('#searchBox').searchbox(function(dealerNameOrPhone) {
        if(park.util.hasIllegeChar(dealerNameOrPhone)){
            st.layer.alert(default_hit_message, {
                icon : 0,
                time : default_close_time
            });
            return ;
        }
        simplePagerGrid.jqGrid('setGridParam', {
            postData : {
                'dealerNameOrPhone' : dealerNameOrPhone
            },
            page : 1
        }).trigger('reloadGrid');
    });
}


//绑定运营商规则
function initAddRela(cautionId) {
    $("#addDealer").click(function() {
        parent.st.layer.iframe({
            title : '未绑定规则的运营商列表',
            closeBtn: 2,
            btn : ['确定','返回'],
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
                simplePagerGrid.trigger("reloadGrid");// 刷新表格
            }
        });
    });

}

//解绑运营商规则
function initDelRela() {
    $("#delDealer").on("click", function() {
        var selectIds = simplePagerGrid.jqGrid('getGridParam', 'selarrrow');//获取所有选中行ID
        if (selectIds.length < 1) {
            st.layer.info('请选择要解除绑定的运营商', {time: default_close_time, shade: [0.3, '#393D49']});
            return false;
        } else {
            st.layer.confirm('解除所选运营商绑定的到期服务通知规则后，将无法收到运营商服务到期提醒，确定要解绑？', {
                time: 0,
                closeBtn: 2,
                btn: ['确定', '取消'],
                yes: function (index, layero) {
                    $.ajax({
                        url: path + '/cautionInfo/deleteDealerRela', // 跳转到 action
                        data: JSON.stringify({
                            "dealerRelaIds": selectIds
                        }),
                        type: 'post',
                        cache: false,
                        dataType: 'json',
                        contentType: 'application/json',
                        success: function (rc) {
                            if (rc.successful) {
                                simplePagerGrid.trigger("reloadGrid");// 刷新表格
                                st.layer.alert("解绑成功", {icon: 1, time: default_close_time});
                            } else {
                                simplePagerGrid.trigger("reloadGrid");// 刷新表格
                                st.layer.error(rc.errorInfo, {icon: 0, time: default_close_time});
                            }
                        },
                        error: function (data) {
                            simplePagerGrid.trigger("reloadGrid");// 刷新表格
                            st.layer.error('系统出错啦', {icon: 0, time: default_close_time});
                        }
                    });
                    // 关闭弹出框
                    st.layer.close(index);
                }
            });
        }
    });
}