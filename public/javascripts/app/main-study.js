define(['jquery','fnbase','editor','./controller/c-study','./model/m-study'],function($,fnbase,editor,controller,model){
    var urlPath = fnbase.getRouterName();
	if(urlPath == "/study"){	//分享文章管理
		controller.getStudyList();
		$("#addButton").on("click",function(){
			window.location.href = "/study-edit?type=add";
		});	
	}else if(urlPath == "/study-edit"){	//编辑详情
		var requestGet = fnbase.GetRequest();
		var urlType = requestGet["type"];
        var urlId = requestGet["id"];
        $("#article").Editor();
        if(urlType == "add"){
			$("#studySubmit").on("click",function(){
				controller.worksEditSubmit();
			});
			$("#pageHeader").html("学习分享 <small>添加文章</small>");
        }else if(urlType == "edit"){
        	controller.editWorks(urlId);
        	$("#pageBack").on("click",function(){
        		window.location.href="/works";
        	});
			$("#pageHeader").html("学习分享 <small>添加文章</small>");
        }
	}else if(urlPath == "/study-type"){	//编辑类型
		var requestGet = fnbase.GetRequest();
		var urlType = requestGet["type"];
        var urlId = requestGet["id"];
        if(urlType == "add"){
			$("#studySubmit").on("click",function(){
				controller.worksEditSubmit();
			});
			$("#pageHeader").html("学习分享 <small>添加类型</small>");
        }else if(urlType == "edit"){
        	controller.editWorks(urlId);
        	$("#pageBack").on("click",function(){
        		window.location.href="/works";
        	});
			$("#pageHeader").html("学习分享 <small>修改类型</small>");
        }
	}
});