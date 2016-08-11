define(['jquery','fnbase','bootstrap','./controller/c-study','./model/m-study'],function($,fnbase,bootstrap,controller,model){
    var urlPath = fnbase.getRouterName();
	if(urlPath == "/study"){	//分享文章管理
		controller.getStudyList();
		$("#addButton").on("click",function(){
			window.location.href = "/study-edit?type=add";
		});	
	}else if(urlPath == "/study-edit"){	//分享文章编辑
		var requestGet = fnbase.GetRequest();
		var urlType = requestGet["type"];
        var urlId = requestGet["id"];
        if(urlType == "add"){
			$("#workSubmit").on("click",function(){
				controller.worksEditSubmit();
			});
			$("#pageHeader").html("作品 <small>添加作品</small>");
        }else if(urlType == "edit"){
        	controller.editWorks(urlId);
        	$("#pageBack").on("click",function(){
        		window.location.href="/works";
        	});
			$("#pageHeader").html("作品 <small>修改作品</small>");
        }
	}
});