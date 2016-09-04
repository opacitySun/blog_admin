define(['jquery','fnbase','./controller/c-fairy','./model/m-fairy','./controller/c-page'],function($,fnbase,controller,model,cPage){
    var urlPath = fnbase.getRouterName();
	if(urlPath == "/fairy"){	//精灵管理
		controller.getFairyList(1,function(total){
			var pageSize = $("#pageSize").val();
			var buttons = $("#pageButton").val();
			cPage.createPage(pageSize,buttons,total,function(pageIndex){
				controller.getFairyList(pageIndex,function(){});
			});
		});
	}else if(urlPath == "/fairy-edit"){	//编辑详情
		var requestGet = fnbase.GetRequest();
		var urlType = requestGet["type"];
        var urlId = requestGet["id"];
		$("#pageBack").on("click",function(){
    		window.location.href="/fairy";
    	});
        if(urlType == "edit"){
        	controller.editFairy(urlId);
			$("#pageHeader").html("精灵 <small>修改</small>");
        }
	}else if(urlPath == "/fairy-type"){	//类型列表
		controller.getFairyTypeList(1,function(total){
			var pageSize = $("#pageSize").val();
			var buttons = $("#pageButton").val();
			cPage.createPage(pageSize,buttons,total,function(pageIndex){
				controller.getFairyTypeList(pageIndex,function(){});
			});
		});
		$("#addButton").on("click",function(){
			window.location.href = "/fairy-type-edit?type=add";
		});
	}else if(urlPath == "/fairy-type-edit"){	//编辑类型
		$("#pageBack").on("click",function(){
    		window.location.href="/fairy-type";
    	});
		if(urlType == "add"){
			$("#fairyTypeSubmit").on("click",function(){
				controller.fairyTypeEditSubmit();
			});
			$("#pageHeader").html("精灵 <small>添加类型</small>");
		}else if(urlType == "edit"){
			controller.editFairyType(urlId);
			$("#pageHeader").html("精灵 <small>修改类型</small>");
		}
	}
});