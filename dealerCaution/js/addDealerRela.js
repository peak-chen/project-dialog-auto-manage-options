// 页面初始化函数
var addDealerGrid;
var cautionInfoDetailQueryUrl = "getDealerUnBindDetailGridData";

var addDealerGridCfg = {
    multiselect : true,
    prmNames : {
	"page" : "pageNo",
	"rows" : "pageSize"
    },
    jsonReader : {
	root : "results",
	id : "dealerId",
	page : "pageNo",
	records : "totalRecord",
	total : "totalPage"
    },
    url : cautionInfoDetailQueryUrl,
    colModel : [ {
	name : "dealerId",
	index : "dealerId",
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
	name : "manager",
	index : "manager",
	align : "left",
	label : "负责人",
	width : 100
    }],
    ajaxGridOptions: {
	timeout : 60000, //超时时间设置，单位毫秒
     },
    embellish : true,// 是否启用优化，包含对复选框和滚动条的优化，若启用会有一定的性能开销，默认为true启用优化
    isAsycnTotal : false,// 是否异步加载总数
    gridview : true,// 设置为true将提高5~10倍的显示速度。但不能再使用treeGrid, subGrid,
    rownumbers : true,
    rownumWidth : 30,
    emptyrecords : "暂无数据",
    pager : "pageDiv",
    loadComplete : function(xhr) {
        var ids = xhr.totalRecord;
        if(ids<1){
            st.layer.warning('未查询到未绑定规则的运营商,请解绑运营商或新增运营商后再操作',function(index){
                st.layer.close(index);
            });
        }
    }
};




$(function() {
    //固定表格高度
    $("#addDealerGrid").css({"height": "375px"});
    addDealerGrid = $("#addDealerGrid").grid(addDealerGridCfg);
    // 查询
    initSearchBox();

    //刷新
    $("#refreshBtn").click(function() {
        if (addDealerGrid) {
            addDealerGrid.reloadGrid();
        }
    });


});

function initSearchBox() {
    $('#searchBoxBtn').searchbox(function(dealerNameOrPhone) {
        if(park.util.hasIllegeChar(dealerNameOrPhone)){
            st.layer.alert(default_hit_message, {
                icon : 0,
                time : default_close_time
            });
            return ;
        }
        addDealerGrid.jqGrid('setGridParam', {
            postData : {
                'dealerNameOrPhone' : dealerNameOrPhone
            },
            page : 1
        }).trigger('reloadGrid');
    });
}


function addDealerRelaAction(cautionName) {

    var selectIds = addDealerGrid.jqGrid('getGridParam', 'selarrrow');//获取所有选中行ID
    if (selectIds.length < 1) {
        st.layer.info('请选择要绑定到<span style="color:red;font-weight: bold;">'+cautionName+'</span>的运营商');
        return false;
    } else {
        $.ajax({
            url: path + '/cautionInfo/addDealerRelaAction', // 跳转到 action
            data: JSON.stringify({
                "dealerIds": selectIds,
                "cautionId":cautionIds
            }),
            type: 'post',
            cache: false,
            dataType: 'json',
            contentType: 'application/json',
            success: function (rc) {
                if (rc.successful) {
                    addDealerGrid.trigger("reloadGrid");// 刷新表格
                    st.layer.alert("绑定成功", {icon: 1, time: default_close_time});
                } else {
                    addDealerGrid.trigger("reloadGrid");// 刷新表格
                    st.layer.error(rc.errorInfo, {icon: 0, time: default_close_time});
                }
            },
            error: function (data) {
                addDealerGrid.trigger("reloadGrid");// 刷新表格
                st.layer.error('系统出错啦', {icon: 0, time: default_close_time});
            }
        });

    }

}