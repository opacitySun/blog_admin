define(['jquery','fnbase','bootstrap','./controller/c-works','./model/m-works'],function($,fnbase,bootstrap,controller,model){
    var urlPath = fnbase.getRouterName();
	if(urlPath == "/works"){	//作品管理
		controller.getWorksList();
		$("#addUserButton").on("click",function(){
			window.location.href = "/works-edit?type=add";
		});	
	}else if(urlPath == "/works-edit"){	//作品编辑
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