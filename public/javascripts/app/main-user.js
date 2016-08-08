define(['jquery','fnbase','bootstrap','./controller/c-user','./model/m-user'],function($,fnbase,bootstrap,controller,model){
    var urlPath = fnbase.getRouterName();
	if(urlPath == "/user"){	//banner管理
		controller.getUserList();
		$("#addUserButton").on("click",function(){
			window.location.href = "/user-edit?type=add";
		});	
	}else if(urlPath == "/user-edit"){	//banner编辑
		var requestGet = fnbase.GetRequest();
		var urlType = requestGet["type"];
        var urlId = requestGet["id"];
        if(urlType == "add"){
        	controller.addImgButtonShowByBannerType();
			controller.addImgFileUpload();
			$("#bannerSubmit").on("click",function(){
				controller.bannerEditSubmit();
			});
			$("#pageHeader").html("首页 <small>banner添加</small>");
        }else if(urlType == "look"){
        	controller.lookBanner(urlId);
        	$("#pageBack").on("click",function(){
        		window.location.href="/banner";
        	});
        	$("#pageHeader").html("首页 <small>banner查看</small>");
        }else if(urlType == "edit"){
        	controller.editBanner(urlId);
        	$("#pageBack").on("click",function(){
        		window.location.href="/banner";
        	});
        	$("#bannerImageEdit").on("click",function(){
        		window.location.href="/banner-image";
        	});
			$("#pageHeader").html("首页 <small>banner修改</small>");
        }
	}
});