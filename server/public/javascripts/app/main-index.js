
define(['jquery','fnbase','bootstrap','./controller/c-index','./model/m-index'],function($,fnbase,bootstrap,controller,model){
    var urlPath = fnbase.getRouterName();
	if(urlPath == "/banner"){	//banner管理
		controller.getBannerList();
		$("#addBannerButton").on("click",function(){
			window.location.href = "/banner-edit?type=add";
		});	
	}else if(urlPath == "/banner-edit"){	//banner编辑
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
	}else if(urlPath == "/banner-image"){
        var requestGet = fnbase.GetRequest();
        var urlId = requestGet["id"];
        controller.getBannerImageList(urlId);
        $("#pageHeader").html("首页 <small>banner图片</small>");
        $("#pageBack").on("click",function(){
            history.go(-1);
        });
    }else if(urlPath == "/banner-image-edit"){
        var requestGet = fnbase.GetRequest();
        var urlId = requestGet["id"];
        $("#bannerId").val(urlId);
        $("#bannerImageSubmit").on("click",function(){
            controller.bannerImageEditSubmit();
        });
        $("#bannerImageBack").on("click",function(){
            history.go(-1);
        });
        $("#pageHeader").html("首页 <small>banner图片</small>");
    }else{	//欢迎页
		$("#pageHeader").html("SUN Admin <small>欢迎来到孙博为的博客管理</small>");
	}
});